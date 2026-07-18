import React from 'react'
import { cn } from '@/shared/utils/utils'

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  size?: TitleSize
  className?: string
  text: string
}

export const Title: React.FC<Props> = ({ text, size = 'sm', className }) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
  } as const

  const mapClassNameBySize = {
    xs: 'text-h22',
    sm: 'text-h24',
    md: 'text-h28',
    lg: 'text-h32',
    xl: 'text-h36',
  } as const

  return React.createElement(
    mapTagBySize[size],
    {
      className: cn(mapClassNameBySize[size], 'font-bold', className),
    },
    text
  )
}
