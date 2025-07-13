import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
          <motion.li whileHover={{ scale: 1.05 }} key={l.to} className={pathname === l.to ? 'active' : ''}>
            <Link to={l.to}>{l.icon} {l.label}</Link>
          </motion.li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
