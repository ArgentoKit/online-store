import { Header } from '@/widgets/header'

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className='mx-auto overflow-x-clip'>
        <div>{children}</div>
      </main>
    </>
  )
}
