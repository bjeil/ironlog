import { useState } from 'react';
import LogPage from './features/LogPage';
import WorkoutsPage from './features/WorkoutsPage';
import ExercisesPage from './features/ExercisesPage';
import StatsPage from './features/StatsPage';
import SettingsPage from './features/SettingsPage';
import ThemeToggle from './components/ThemeToggle';

type Tab = 'log' | 'workouts' | 'exercises' | 'stats' | 'settings';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'log', label: 'Logg', icon: '📝' },
  { id: 'workouts', label: 'Økter', icon: '🏋️' },
  { id: 'exercises', label: 'Øvelser', icon: '💪' },
  { id: 'stats', label: 'Statistikk', icon: '📊' },
  { id: 'settings', label: 'Innstillinger', icon: '⚙️' }
];

export default function App() {
  const [tab, setTab] = useState<Tab>('log');

  return (
    <div className="mx-auto min-h-dvh max-w-lg pb-24">
      <header className="sticky top-0 z-20 border-b border-app-border/15 bg-app-bg/90 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+12px)] backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-app-surface ring-2 ring-app-accent">
              <span className="text-lg">🏋️</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">IronLog</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="px-4 pt-4">
        {tab === 'log' && <LogPage />}
        {tab === 'workouts' && <WorkoutsPage />}
        {tab === 'exercises' && <ExercisesPage />}
        {tab === 'stats' && <StatsPage />}
        {tab === 'settings' && <SettingsPage />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-app-border/15 bg-app-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg pb-[calc(env(safe-area-inset-bottom)+8px)]">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] transition ${
                tab === t.id ? 'text-app-accent' : 'text-app-text/60 hover:text-app-text'
              }`}
            >
              <span className="text-lg leading-none">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
