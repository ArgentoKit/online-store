import { cn } from '@/shared/utils/utils'

const colors = [
  { id: 1, name: 'Grey', value: 'var(--color-medium-grey)' },
  { id: 2, name: 'Green', value: 'var(--color-light-green)' },
  { id: 3, name: 'Black', value: 'var(--color-dark-grey)' },
  { id: 4, name: 'Orange', value: 'var(--color-light-orange)' },
]

interface ProductColorsProps {
  selectedColor: number
  onChange: (id: number) => void
}

export function ProductColors({ selectedColor, onChange }: ProductColorsProps) {
  return (
    <div className='flex items-center gap-2.5'>
      {colors.map((color) => (
        <button
          key={color.id}
          type='button'
          onClick={() => onChange(color.id)}
          title={color.name}
          className={cn(
            'relative h-3 w-3 rounded-full border transition-all',
            selectedColor === color.id && 'ring ring-primary ring-offset-2'
          )}
        >
          <span className='block h-full w-full rounded-full' style={{ backgroundColor: color.value }} />

          {color.name === 'White' && <span className='absolute inset-0 rounded-full border' />}
        </button>
      ))}
    </div>
  )
}
