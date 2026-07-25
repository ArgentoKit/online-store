import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { AuthService } from '../api/auth.service'
import { formRegisterSchema, type RegisterSchemaType } from '../model/register.schema'

export const useRegisterForm = () => {
  const router = useRouter()

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  })

  const { mutate, isPending, error } = useMutation({
    mutationKey: ['register user'],
    mutationFn: (data: RegisterSchemaType) => AuthService.main('register', data),
    onSuccess() {
      form.reset()
      toast.success('Successful authorization')
      router.replace(PUBLIC_URL.user())
    },
    onError(error) {
      toast.error(error?.message || 'Authorization error')
    },
  })

  const onSubmit = form.handleSubmit((values) => mutate(values))

  return { form, onSubmit, isPending, error }
}
