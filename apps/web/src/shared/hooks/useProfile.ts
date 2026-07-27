import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/entities/user/api/user.service'

export function useProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => UserService.getUserProfile(),
  })

  return { user, isLoading }
}
