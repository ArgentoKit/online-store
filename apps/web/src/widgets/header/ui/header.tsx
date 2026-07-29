import { BottomHeader } from './bottom-header'
import { TopHeader } from './top-header'

interface HeaderProps {
  bottom?: React.ReactNode
}

export function Header({ bottom }: HeaderProps) {
  return (
    <header className=''>
      <div className='w-full h-1.5 bg-linear-to-r from-bright-green to-white'></div>
      <TopHeader />
      <BottomHeader>{bottom}</BottomHeader>
    </header>
  )
}
