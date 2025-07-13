import { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <label className="swap">
      <input type="checkbox" checked={dark} onChange={() => setDark(!dark)} />
      <span className="swap-on">🌙</span>
      <span className="swap-off">☀️</span>
    </label>
  );
}

export default DarkModeToggle;
