import { Controller } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useAuthForm } from '../lib/useAuthForm'
import { formLoginSchema } from '../model/login.schema'

export function FormLogin() {
  const { form, onSubmit, isPending } = useAuthForm({
    type: 'login',
    schema: formLoginSchema,
  })

  return (
    <Card>
      <CardContent>
        <form id='login-form' onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='login-email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='login-email'
                    aria-invalid={fieldState.invalid}
                    type='email'
                    placeholder='m@example.com'
                    required
                  />
                </Field>
              )}
            ></Controller>
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='login-password'>Password</FieldLabel>
                  <Input {...field} id='login-password' aria-invalid={fieldState.invalid} type='password' required />
                </Field>
              )}
            ></Controller>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Button form='login-form' variant='green' type='submit' disabled={isPending}>
                {isPending ? 'Отправка...' : 'Войти'}
              </Button>
            </Field>
          </FieldGroup>
          <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
            Забыли пароль?
          </a>
        </form>
      </CardContent>
    </Card>
  )
}
