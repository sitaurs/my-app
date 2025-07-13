import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Overview', icon: '🏠' },
  { to: '/trades', label: 'Trades', icon: '📊' },
  { to: '/prompts', label: 'Prompts', icon: '📝' },
  { to: '/env', label: 'Env', icon: '⚙️' },
  { to: '/settings', label: 'Settings', icon: '🔧' },
];

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="w-48 bg-base-200 p-4">
      <ul className="menu">
        {links.map((l) => (
          <li key={l.to} className={pathname === l.to ? 'active' : ''}>
            <Link to={l.to}>{l.icon} {l.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
