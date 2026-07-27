import LogoD from '@/shared/assets/icons/logo-d.svg'
import { cn } from '@/shared/utils/utils'
import { PUBLIC_URL } from '../config/url.config'

export function Logo({ className }: { className?: string }) {
  return (
    <a href={PUBLIC_URL.home()} className={cn('flex items-center gap-0.75 max-w-fit max-h-fit', className)}>
      <LogoD />
      <span className='text-t18 font-bold text-bright-green'>ily.com</span>
    </a>
  )
}
