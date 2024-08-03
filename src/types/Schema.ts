import { z } from 'zod';
import { patterns } from '../utils/mask';

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
    z.object({
      projectName: z.string().min(1, { message: 'Название проекта обязательно' }),
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
    },
  ],
};
