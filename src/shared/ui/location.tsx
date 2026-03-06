import ArrowDown from '@/shared/assets/icons/arrow-down.svg'
import Geo from '@/shared/assets/icons/geo.svg'
import { cn } from '@/shared/utils/utils'

export function Location({ className }: { className?: string }) {
  return (
    <div className='flex items-center gap-2.5 cursor-pointer'>
      <Geo className='relative' />
      <span className={cn('inline-block text-t14 text-dark-grey/80', className)}>Прага</span>
      <ArrowDown />
    </div>
  )
}
