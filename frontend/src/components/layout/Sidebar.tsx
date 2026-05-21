import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Calculateur' },
  { to: '/items', label: 'Items' },
  { to: '/recipes', label: 'Recettes' },
  { to: '/planner', label: 'Planner' },
]

export default function Sidebar() {
  return (
    <ul className="menu bg-base-200 dark:bg-gray-800 min-h-full w-56 p-4 gap-1">
      <li className="menu-title text-lg font-bold mb-2">Navigation</li>
      {links.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            end
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
