import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { AuthService } from '../api/auth.service'
import { formLoginSchema, type LoginSchemaType } from '../model/login.schema'

export const useLoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  })

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data: LoginSchemaType) => AuthService.main('login', data),
    onSuccess() {
      form.reset()
      toast.success('Successful authorization')
      router.replace(PUBLIC_URL.home())
    },
    onError(error) {
      toast.error(error?.message || 'Authorization error')
    },
  })

  const onSubmit = form.handleSubmit((values) => mutate(values))

  return { form, onSubmit, isPending, error }
}
