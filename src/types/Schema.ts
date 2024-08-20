import { z, ZodIssueCode } from 'zod';
import { patterns } from '../utils/mask';
import { startOfDay } from 'date-fns';

export const schema = z.object({
  lastName: z
    .string()
    .trim()
    .refine((value) => value !== '', { message: 'Это поле обязательное' }),
  firstName: z
    .string()
    .trim()
    .refine((value) => value !== '', { message: 'Это поле обязательное' }),
  patronymic: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Это поле обязательное' })
    .refine((text) => patterns.phone.test(text), { message: 'Это не похоже на номер телефона' }),
  email: z.string().trim().email({ message: 'Email неправильный' }).optional().or(z.literal('')),
  agree: z.boolean().refine((value) => value === true, { message: 'Подтвердите согласие' }),
  projects: z.array(
    z
      .object({
        projectName: z
          .string()
          .trim()
          .refine((value) => value !== '', { message: 'Название проекта обязательно' }),
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
            code: ZodIssueCode.custom,
            path: ['dateStartWork'],
            message: 'Дата начала не может быть раньше сегодняшней',
          });
        }

        if (data.dateStartWork && data.dateEndWork && data.dateStartWork > data.dateEndWork) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
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
