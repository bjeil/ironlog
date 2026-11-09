import ThemeToggle from '../components/ThemeToggle';

export default function SettingsPage() {
  return (
    <div className="card p-6">
      <h2 className="text-lg font-semibold">Innstillinger</h2>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-app-text/80">Mørkt / lyst tema</span>
        <ThemeToggle />
      </div>
      <p className="mt-4 text-sm text-app-text/60">
        Innlogging (fase 2) og CSV-eksport (fase 4) får egne seksjoner her.
      </p>
    </div>
  );
}
