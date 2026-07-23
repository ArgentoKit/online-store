import * as z from 'zod'

export const formLoginSchema = z.object({
  email: z.email('Введите корректный email').trim().max(255, 'Email слишком длинный'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(100, 'Пароль слишком длинный')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру'
    ),
})

export type LoginSchemaType = z.infer<typeof formLoginSchema>
