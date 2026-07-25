import { Metadata } from 'next'
import { UserPage } from '@/views/user'

export const metadata: Metadata = {
  title: 'Личный кабинет',
}

export default function UserRoute() {
  return <UserPage />
}
