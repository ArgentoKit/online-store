import { Controller } from 'react-hook-form'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { useRegisterForm } from '../lib/useRegisterForm'

export function FormRegister() {
  const { form, onSubmit, isPending } = useRegisterForm()

  return (
    <Card className='auth-form border-0 shadow-none'>
      <CardContent className='p-0'>
        <form id='register-form' onSubmit={onSubmit} noValidate>
          <FieldGroup className='mb-7.5'>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-name'>
                    Ваше имя<span className='text-tb18 font-bold text-bright-green'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id='register-name'
                    type='text'
                    aria-invalid={fieldState.invalid}
                    placeholder='Имя'
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>

            <Controller
              name='lastName'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-lastname'>
                    Ваша фамилия<span className='text-tb18 font-bold text-bright-green'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id='register-lastname'
                    type='text'
                    aria-invalid={fieldState.invalid}
                    placeholder='Фамилия'
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>

            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-email'>
                    Email<span className='text-tb18 font-bold text-bright-green'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id='register-email'
                    type='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='m@example.com'
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>

            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-password'>
                    Password<span className='text-tb18 font-bold text-bright-green'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id='register-password'
                    type='password'
                    placeholder='********'
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>

            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='register-confirm-password'>
                    Confirm Password<span className='text-tb18 font-bold text-bright-green'>*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id='register-confirm-password'
                    type='password'
                    placeholder='********'
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            ></Controller>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <Button form='register-form' variant='green' size='lg' type='submit' disabled={isPending}>
                {isPending ? 'Отправка...' : 'Войти'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
