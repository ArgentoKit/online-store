'use client'

import { Gavel, HeartHandshake, type LucideIcon, Newspaper, Store, Wrench } from 'lucide-react'
import { useState } from 'react'
import Logo from '@/shared/assets/icons/logo-white.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Title } from '@/shared/ui/title'
import { useAuthForm } from '../lib/useAuthForm'
import { FormLogin } from './login-form'
import { FormRegister } from './register-form'

const iconMap = {
  newspaper: Newspaper,
  gavel: Gavel,
  wrench: Wrench,
  store: Store,
  handshake: HeartHandshake,
} as const

type IconName = keyof typeof iconMap

function getIconByName(name: string): LucideIcon {
  return iconMap[name as IconName]
}

const listContent = [
  {
    text: 'Размещайте объявления бесплатно',
    iconName: 'newspaper',
  },
  {
    text: 'Продавайте на аукционе',
    iconName: 'gavel',
  },
  {
    text: 'Ремонтируйте свою технику',
    iconName: 'wrench',
  },
  {
    text: 'Откройте свой магазин',
    iconName: 'store',
  },
  {
    text: 'Помогайте нуждающимся ',
    iconName: 'handshake',
  },
]

export function Auth() {
  return (
    <div className='min-h-screen relative flex'>
      <div className='w-[43.5%] flex items-center justify-end bg-bright-green -mt-[20vh] pr-23'>
        <div className='flex flex-col gap-27.5'>
          <div>
            <Logo className='mb-5' />
            <Title text='Супер доска объявлений' size='xl' className='text-white tracking-[0.5]' />
          </div>
          <ul className='flex flex-col gap-[45px]'>
            {listContent.map((item) => {
              const FeatureIcon = getIconByName(item.iconName)

              return (
                <li key={item.text} className='flex gap-[15px] items-center'>
                  <FeatureIcon color='#ffffff' strokeWidth={1.5} />
                  <span className='text-h22 text-white tracking-[0.5]'>{item.text}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='flex w-[56.5%] items-center -mt-[20vh] pl-[255px]'>
        <Tabs defaultValue='login' className='w-77.5'>
          <TabsList className='w-full'>
            <TabsTrigger value='login' className='text-t18'>
              Вход
            </TabsTrigger>
            <TabsTrigger value='register' className='text-t18'>
              Регистрация
            </TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <FormLogin />
          </TabsContent>
          <TabsContent value='register'>
            <FormRegister />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
