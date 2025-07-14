'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'

export default function LayoutWrapper({ children }) {
  const path = usePathname()
  const isAuthPage =
    path?.toLowerCase().includes('/login') || path?.toLowerCase().includes('/register')

  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isAuthPage) return <>{children}</>

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content scroll */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
