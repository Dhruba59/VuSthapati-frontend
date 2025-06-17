
import type React from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import LayoutWrapper from "@/components/layout-wrapper"

export const metadata: Metadata = {
  title: "VU-STHAPATI",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Navbar />
          <main className="flex-1">
            <LayoutWrapper>{children}</LayoutWrapper>
          </main>
    </>
  )
}