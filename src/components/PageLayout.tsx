import type { ReactNode } from "react"
import Header from "./Header"

interface PageLayoutProps {
  children: ReactNode
  width?: string
}

export default function PageLayout({ children, width = "max-w-3xl" }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className={`${width} mx-auto px-4 sm:px-6 py-8 md:py-12`}>{children}</main>
    </div>
  )
}
