import { z } from 'zod';
import { patterns } from '../utils/mask';
import { isSameDay, startOfDay } from 'date-fns';

export const schema = z.object({
  lastName: z.string().min(1, { message: 'Это поле обязательное' }),
  firstName: z.string().min(1, { message: 'Это поле обязательное' }),
  patronymic: z.string().min(1, { message: 'Это поле обязательное' }),
  phone: z
    .string()
    .min(1, { message: 'Это поле обязательное' })
    .refine((text) => patterns.phone.test(text), { message: 'Это не похоже на номер телефона' }),
  email: z
    .string()
    .optional()
    .refine((text) => !text || patterns.email.test(text), { message: 'Email неправильный' }),
  agree: z.boolean().refine((value) => value === true, { message: 'Подтвердите согласие' }),
  projects: z.array(
    z
      .object({
        projectName: z.string().min(1, { message: 'Название проекта обязательно' }),
        skills: z
          .array(z.string().min(1, { message: 'Навык обязателен' }))
          .min(1, { message: 'Добавьте хотя бы один навык' }),
        role: z.string().min(1, { message: 'Укажите свою роль на проекте' }),
        dateStartWork: z.date(),
        dateEndWork: z.date().optional(),
      })
      .superRefine((data, ctx) => {
        const today = startOfDay(new Date());

        if (data.dateStartWork < today) {
          ctx.addIssue({
            path: ['dateStartWork'],
            message: 'Дата начала не может быть раньше сегодняшней',
          });
        }

        if (data.dateStartWork && data.dateEndWork && data.dateStartWork > data.dateEndWork) {
          ctx.addIssue({
            path: ['dateEndWork'],
            message: 'Дата начала не может быть позже даты окончания',
          });
        }
      }),
  ),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  lastName: '',
  firstName: '',
  patronymic: '',
  phone: '',
  email: '',
  agree: false,
  projects: [
    {
      projectName: '',
      skills: [],
      role: '',
      dateStartWork: new Date(),
      dateEndWork: undefined,
    },
  ],
};
