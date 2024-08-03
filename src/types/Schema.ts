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
    .min(1, { message: 'Это поле обязательное' })
    .refine((text) => patterns.email.test(text), { message: 'Введите корректные данные' })
    .optional(),
});

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  lastName: '',
  firstName: '',
  patronymic: '',
  phone: '',
  email: '',
};
