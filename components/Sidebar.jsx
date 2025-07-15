'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHome, FaUserCircle, FaCog, FaMoneyBillWave, FaWallet, FaTimes,
} from 'react-icons/fa'

const navLinks = [
  { name: 'Home', path: '/dashboard', icon: <FaHome /> },
  { name: 'Income', path: '/income', icon: <FaMoneyBillWave /> },
  { name: 'Expenses', path: '/expenses', icon: <FaWallet /> },
    { name: 'Transactions', path: '/transactions', icon: <FaWallet /> },

]

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname()

  return (
    <>
      <aside className="w-64 bg-blue-900 text-white py-8 px-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-10">💼 FinTrack</h2>
        <nav className="space-y-4 text-base">
          {navLinks.map(link => {
            const isActive = pathname === link.path
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-blue-800'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden" onClick={onClose}>
          <aside
            className="w-64 bg-blue-900 text-white py-8 px-6 h-full absolute left-0 top-0 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">💼 FinTrack</h2>
              <button onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <nav className="space-y-4 text-base">
              {navLinks.map(link => {
                const isActive = pathname === link.path
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-blue-800'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  )
}
