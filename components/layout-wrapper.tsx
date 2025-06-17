'use client'

import { usePathname } from 'next/navigation'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className={isHome ? '' : 'mt-20'}>
      {children}
    </div>
  )
}