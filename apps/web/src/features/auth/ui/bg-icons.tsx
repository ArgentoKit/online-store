import WaveGreen from '@/shared/assets/icons/wave-green.svg'
import WaveGreenLight from '@/shared/assets/icons/wave-green-light.svg'
import WaveOrange from '@/shared/assets/icons/wave-orange.svg'
import WaveOrangeBright from '@/shared/assets/icons/wave-orange-bright.svg'

export function BgIcons() {
  return (
    <>
      <WaveGreenLight className='absolute top-[30vh] left-[5vw]' />
      <WaveGreen className='absolute top-[25vh] right-[10vw]' />
      <WaveOrange className='absolute w-30 top-[50vh] -right-2' />
      <WaveOrangeBright className='absolute top-[65vh] left-5' />
      <WaveGreen className='absolute bottom-[10vh] left-20 -rotate-[60deg] scale-150' />
      <WaveOrangeBright className='absolute bottom-[8vh] right-0 -rotate-[20deg]' />
    </>
  )
}
