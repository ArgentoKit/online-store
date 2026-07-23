import * as z from 'zod'

export const formRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .max(50, 'Имя не должно превышать 50 символов'),
    lastName: z
      .string()
      .trim()
      .min(2, 'Фамилия должна содержать минимум 2 символа')
      .max(50, 'Фамилия не должна превышать 50 символов'),

    email: z.email('Введите корректный email').trim().max(255, 'Email слишком длинный'),
    password: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .max(100, 'Пароль слишком длинный')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type RegisterSchemaType = z.infer<typeof formRegisterSchema>
