export function Sidebar({
  children,
}: Readonly<{
  children?: React.ReactNode
}>) {
  return <nav className='flex flex-col max-w-[270px] pt-[25px] pl-[25px] pr-[30px] pb-[30px] shadow'>{children}</nav>
}
