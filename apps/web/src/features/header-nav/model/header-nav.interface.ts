import { LucideIcon } from 'lucide-react'

type NavItemBase = {
  title: string
  icon: LucideIcon
}

export type HeaderNavLink =
  | (NavItemBase & { type: 'link'; href: string })
  | (NavItemBase & { type: 'button'; onClick?: () => void })

export interface HeaderNavProps {
  links: HeaderNavLink[]
}
