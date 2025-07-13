import { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'coffee' : 'cupcake';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <label className="swap transition-colors duration-400">
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
      <span className="swap-on">🌙</span>
      <span className="swap-off">☀️</span>
    </label>
  );
}

export default DarkModeToggle;
