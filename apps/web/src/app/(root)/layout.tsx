import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { DefaultBottom } from '@/widgets/header/ui/default-bottom'

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header bottom={<DefaultBottom />} />
      <main className='w-full mx-auto overflow-x-clip overflow-y-visible'>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  )
}
