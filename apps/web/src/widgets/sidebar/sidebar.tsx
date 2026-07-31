import { cn } from '@/shared/utils/utils'

export function Sidebar({ children, className }: React.ComponentProps<'nav'> & { children?: React.ReactNode }) {
  return <nav className={cn('flex flex-col w-67.5', className)}>{children}</nav>
}
