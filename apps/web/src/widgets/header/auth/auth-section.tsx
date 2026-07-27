'use client'

import Image from 'next/image'
import Link from 'next/link'
import Person from '@/shared/assets/icons/person.svg'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { useProfile } from '@/shared/hooks/useProfile'
import { Spinner } from '@/shared/ui/spinner'

export function AuthSection() {
  const { user, isLoading } = useProfile()

  if (isLoading) return <Spinner className='size-6' />

  return (
    <div>
      {user && (
        <>
          <Link href={PUBLIC_URL.user()}>
            <Image src={user.avatarPath} alt={user.name} width={30} height={30} className='rounded-full' />
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link href={PUBLIC_URL.auth()} className='flex items-center gap-2.5'>
            <Person />
            <span className='text-t14 font-medium text-dark-grey'>Вход/ регистрация</span>
          </Link>
        </>
      )}
    </div>
  )
}
