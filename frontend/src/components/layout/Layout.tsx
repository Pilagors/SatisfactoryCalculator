import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="main-drawer" className="drawer-overlay" />
        <Sidebar />
      </div>
    </div>
  )
}
