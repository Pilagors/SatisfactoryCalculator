import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Calculateur' },
  { to: '/items', label: 'Items' },
  { to: '/recipes', label: 'Recettes' },
  { to: '/planner', label: 'Planner' },
]

export default function Sidebar() {
  return (
    <aside className="w-56 min-h-screen border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 flex-shrink-0">
      <nav className="flex flex-col gap-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
