"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FolderOpen, Mail, LogOut, Menu, X, NewspaperIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { authAPI } from "@/lib/api"
import { isAdmin } from "@/lib/utils"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      if (!adminStatus) {
        console.log("Not an admin, redirecting to login page");
        router.push("/admin/login");
      }
    };
    checkAdmin();

  });

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/admin/login")
  }

  if (isLoading) {
    return <AdminDashboardSkeleton />
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-shrink-0 border-r bg-background md:flex md:flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin/dashboard" className="flex items-center font-semibold">
            Admin Dashboard
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/projects"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <FolderOpen className="h-4 w-4" />
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/admin/news"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <NewspaperIcon className="h-4 w-4" />
                News
              </Link>
            </li>
            <li>
              <Link
                href="/admin/messages"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
                Messages
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile header and sidebar */}
      <div className="flex min-h-screen flex-col md:hidden">
        <header className="flex h-14 items-center border-b px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-14 items-center border-b px-4">
                <Link href="/admin/dashboard" className="flex items-center font-semibold">
                  Admin Dashboard
                </Link>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="grid gap-1 p-4">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/dashboard/projects"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <FolderOpen className="h-4 w-4" />
                  Projects
                </Link>
                <Link
                  href="/admin/dashboard/messages"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  <Mail className="h-4 w-4" />
                  Messages
                </Link>
                <Button variant="outline" className="mt-4 w-full justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-2 font-semibold">Admin Dashboard</div>
        </header>

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>

      {/* Main content for desktop */}
      <main className="hidden flex-1 overflow-auto mt-8 p-6 md:block">{children}</main>
    </div>
  )
}

function AdminDashboardSkeleton() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="hidden w-64 flex-shrink-0 border-r bg-background md:flex md:flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Skeleton className="h-6 w-40" />
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="grid gap-1 px-2">
            {[1, 2, 3].map((i) => (
              <li key={i}>
                <Skeleton className="h-10 w-full rounded-md" />
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </aside>

      <div className="flex min-h-screen flex-col md:hidden">
        <header className="flex h-14 items-center border-b px-4">
          <Skeleton className="h-8 w-8 mr-2" />
          <Skeleton className="h-6 w-40" />
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-md" />
            ))}
          </div>
        </main>
      </div>

      <main className="hidden flex-1 overflow-auto p-6 md:block">
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-md" />
          ))}
        </div>
      </main>
    </div>
  )
}

