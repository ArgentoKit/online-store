import { LucideIcon } from 'lucide-react'

type NavItemBase = {
  title: string
  icon: LucideIcon
}

export type HeaderNavLink =
  | (NavItemBase & { type: 'link'; href: string })
  | (NavItemBase & { type: 'button'; onClick?: () => void })
  | { type: 'node'; key: string; node: React.ReactNode }

export interface HeaderNavProps {
  links: HeaderNavLink[]
}
