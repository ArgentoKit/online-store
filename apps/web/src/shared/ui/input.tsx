import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/shared/utils/utils'

const inputVariants = cva('input', {
  variants: {
    variant: {
      default: 'input-default',
    },
    size: {
      default: 'input-size-default',
      sm: 'input-size-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return <input type={type} data-slot='input' className={cn(inputVariants({ variant, size, className }))} {...props} />
}

export { Input }
