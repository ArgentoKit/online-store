'use client'

import { Eye, Heart, LogOut, LucideIcon, Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PUBLIC_URL } from '@/shared/config/url.config'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb'
import { Card } from '@/shared/ui/card'
import { Title } from '@/shared/ui/title'
import { cn } from '@/shared/utils/utils'
import { Sidebar } from '@/widgets/sidebar'

export interface INavLink {
  icon: LucideIcon
  value: string
  link: string
}

export function UserPage() {
  const routes: INavLink[] = [
    {
      icon: Newspaper,
      link: PUBLIC_URL.order(),
      value: 'Мои объявления',
    },
    {
      icon: Heart,
      link: PUBLIC_URL.wish(),
      value: 'Закладки',
    },
    {
      icon: Eye,
      link: PUBLIC_URL.viewed(),
      value: 'Просмотренные товары',
    },
    {
      icon: LogOut,
      link: PUBLIC_URL.logout(),
      value: 'Выйти из аккаунта',
    },
  ]

  const pathname = usePathname()

  return (
    <div className='container'>
      <Breadcrumb className='py-5'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={PUBLIC_URL.home()}>Главная страница</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Личный кабинет</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className='flex gap-7.5'>
        <Sidebar className='gap-7.5'>
          <Card className='flex-row gap-5 items-center px-5 py-4'>
            <Image src='/images/avatar.png' width={70} height={70} alt='avatar' />
            <span className='text-t18'>Алексей К.</span>
          </Card>

          <Card>
            <ul className='flex flex-col gap-5 pt-6 pr-7.5 pb-7.5 pl-5'>
              {routes.map((route) => (
                <li key={route.link}>
                  <Link
                    href={route.link}
                    className={cn('flex items-center gap-2.5 text-t16 hover:text-bright-green', {
                      'text-bright-green': pathname === route.link,
                    })}
                  >
                    <route.icon strokeWidth={1} color='#00C65E' size={20} />
                    <span>{route.value}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </Sidebar>

        <div>
          <Title text='Личный кабинет' size='lg' />
          <Title text='Личные данные' size='xs' />
          <Title text='Общие настройки' size='xs' />
        </div>
      </div>
    </div>
  )
}
