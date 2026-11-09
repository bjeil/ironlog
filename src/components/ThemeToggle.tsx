import { useState } from 'react';
import { getTheme, toggleTheme, type Theme } from '../lib/theme';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(getTheme());

  const onToggle = () => setThemeState(toggleTheme());

  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
      title={theme === 'dark' ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border/20 bg-app-surface text-lg hover:bg-app-hover/10 active:scale-95 transition"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
