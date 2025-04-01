import type { ReactNode } from "react"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}

