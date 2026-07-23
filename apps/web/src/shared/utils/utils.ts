import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: ['h36', 'h32', 'h28', 'h24', 'h22', 't18', 't16', 't14', 't12', 't10'],
        },
      ],
    },
  },
})

export function cn(...args: ClassValue[]) {
  return customTwMerge(clsx(args))
}
