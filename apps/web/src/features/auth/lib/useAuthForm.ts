import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { AuthService } from '../api/auth.service'
import { IAuthForm } from '../model/auth.interface'

type AuthType = 'login' | 'register'
type AuthSchema = z.ZodObject<z.core.$ZodShape>

interface Props<TSchema extends AuthSchema> {
  type: AuthType
  schema: TSchema
}

export const useAuthForm = <TSchema extends AuthSchema>({ type, schema }: Props<TSchema>) => {
  const router = useRouter()

  const form = useForm<z.input<TSchema>, any, z.output<TSchema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['auth user'],
    mutationFn: (data: z.output<TSchema>) => AuthService.main(type, data as IAuthForm),
    onSuccess() {
      form.reset()
      toast.success('Successful authorization')
      router.replace(PUBLIC_URL.home())
    },
    onError(error) {
      toast.error(error?.message || 'Authorization error')
    },
  })

  const onSubmit = form.handleSubmit((values) => {
    mutate(values)
  })

  return { form, onSubmit, isPending, error }
}
