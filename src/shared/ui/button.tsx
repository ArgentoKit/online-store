import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/shared/utils/utils'

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      default: 'btn-default',
      destructive: 'btn-destructive',
      outline: 'btn-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      link: 'btn-link',
      green: 'btn-green',
      disabled: 'btn-disabled',
    },
    size: {
      default: 'btn-size-default',
      xs: 'btn-size-xs',
      sm: 'btn-size-sm',
      lg: 'btn-size-lg',
      b30: 'btn-size-b30',
      b40: 'btn-size-b40',
    },
    icon: {
      only: 'btn-icon-only',
      right: 'btn-icon-right',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
