import { z } from 'zod';
import { patterns } from '../utils/mask';

export const schema = z.object({
  lastName: z.string().min(1, { message: 'Это поле обязательное' }),
  firstName: z.string().min(1, { message: 'Это поле обязательное' }),
  patronymic: z.string().min(1, { message: 'Это поле обязательное' }),
  phone: z
    .string()
    .min(1, { message: 'Это поле обязательное' })
    .refine((text) => patterns.phone.test(text), { message: 'Введите корректные данные' }),
  email: z
    .string()
    .optional()
    .refine((text) => !text || patterns.email.test(text), { message: 'Email неправильный' }),
  agree: z.boolean().refine((value) => value === true, { message: 'Подтвердите согласие' }),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  lastName: '',
  firstName: '',
  patronymic: '',
  phone: '',
  email: '',
  agree: false,
};
