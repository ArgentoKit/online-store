'use client'

interface BottomHeaderProps {
  children: React.ReactNode
}

export function BottomHeader({ children }: BottomHeaderProps) {
  return (
    <div className='py-2.5 border-b-[1.5px] border-medium-grey bg-light-grey'>
      <div className='container grid grid-cols-[520px_300px_1fr] gap-10'>{children}</div>
    </div>
  )
}
