import { Checkbox } from './checkbox'
import { Label } from './label'

export interface FilterCheckboxProps {
  text: string
  value: string
  endAdornment?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
}) => {
  return (
    <div className='flex items-center gap-[15px]'>
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        id={`checkbox-${String(value)}`}
        className='w-4 h-4'
      />
      <Label htmlFor={`checkbox-${String(value)}`} className='leading-none cursor-pointer flex-1 text-t14 font-normal'>
        {text}
      </Label>
      {endAdornment}
    </div>
  )
}
