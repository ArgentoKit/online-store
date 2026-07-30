import Link from 'next/link'
import { cn } from '../utils/utils'
import { Title } from './title'

interface SectionHeaderProps {
  title: string
  href?: string
  linkText?: string
  className?: string
}

export const SectionHeader = ({ title, href, linkText = 'Смотреть все', className }: SectionHeaderProps) => (
  <div className={cn('flex items-center justify-between', className)}>
    <Title text={title} size='lg' />
    {href && (
      <Link href={href} className='font-medium'>
        {linkText}
      </Link>
    )}
  </div>
)
