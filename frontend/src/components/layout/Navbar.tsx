import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Satisfactory Calculator
      </Link>
      <ThemeToggle />
    </nav>
  )
}
