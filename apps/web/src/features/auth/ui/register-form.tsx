import { Controller } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useAuthForm } from '../lib/useAuthForm'
import { formRegisterSchema } from '../model/register.schema'

export function FormRegister() {
  const { form, onSubmit, isPending } = useAuthForm({
    type: 'register',
    schema: formRegisterSchema,
  })

  return (
    <Card>
      <CardContent>
        <form id='register-form' onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-name'>Ваше имя</FieldLabel>
                  <Input
                    {...field}
                    id='register-name'
                    type='text'
                    aria-invalid={fieldState.invalid}
                    placeholder='Имя'
                    required
                  />
                </Field>
              )}
            ></Controller>

            <Controller
              name='lastName'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-lastname'>Ваша фамилия</FieldLabel>
                  <Input
                    {...field}
                    id='register-lastname'
                    type='text'
                    aria-invalid={fieldState.invalid}
                    placeholder='Фамилия'
                    required
                  />
                </Field>
              )}
            ></Controller>

            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='register-email'
                    type='email'
                    aria-invalid={fieldState.invalid}
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
                  <FieldLabel htmlFor='register-password'>Password</FieldLabel>
                  <Input {...field} id='register-password' type='password' aria-invalid={fieldState.invalid} required />
                </Field>
              )}
            ></Controller>

            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-confirm-password'>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id='register-confirm-password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    required
                  />
                </Field>
              )}
            ></Controller>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Button form='register-form' variant='green' type='submit' disabled={isPending}>
                {isPending ? 'Отправка...' : 'Войти'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
