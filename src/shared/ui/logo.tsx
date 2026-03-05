import LogoD from '@/shared/assets/icons/logo-d.svg'
import { cn } from '@/shared/utils/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <a href='/' className={cn('flex items-center gap-0.75 max-w-fit max-h-fit', className)}>
      <LogoD />
      <span className='text-t18 font-bold text-bright-green'>ily.com</span>
    </a>
  )
}
