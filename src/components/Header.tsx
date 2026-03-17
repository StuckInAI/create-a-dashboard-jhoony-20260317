'use client';

interface HeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

export default function Header({ onMenuClick, darkMode, onToggleDark }: HeaderProps) {
  return (
    <header
      className="flex h-16 shrink-0 items-center justify-between px-4 shadow-sm"
      style={{
        backgroundColor: 'rgb(var(--card))',
        borderBottom: '1px solid rgb(var(--border))',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg className="h-5 w-5" style={{ color: 'rgb(var(--foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
          {process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          style={{ color: 'rgb(var(--foreground))' }}
          aria-label="Toggle dark mode"
        >
          <span>{darkMode ? '☀️' : '🌙'}</span>
          <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
        </button>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Notifications"
        >
          <svg className="h-5 w-5" style={{ color: 'rgb(var(--foreground))' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          A
        </div>
      </div>
    </header>
  );
}
