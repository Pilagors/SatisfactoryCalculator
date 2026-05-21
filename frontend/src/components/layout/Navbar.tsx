import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-4">
      <div className="flex-none lg:hidden">
        <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Satisfactory Calculator
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  )
}
