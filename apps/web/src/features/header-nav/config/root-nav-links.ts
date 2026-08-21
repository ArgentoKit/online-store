import { Menu, Van } from 'lucide-react'
import { HeaderNavLink } from '../model/header-nav.interface'

export const rootNavLinks: HeaderNavLink[] = [
  {
    type: 'link',
    title: 'Доставка и оплата',
    href: '/payment',
    icon: Van,
  },
]
