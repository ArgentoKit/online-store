export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='mx-auto overflow-x-clip'>
      <div>{children}</div>
    </main>
  )
}