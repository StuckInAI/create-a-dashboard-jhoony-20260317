'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState(
    process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'
  );
  const [description, setDescription] = useState(
    'A powerful admin dashboard for managing your application.'
  );
  const [notifications, setNotifications] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--foreground))' }}>
            Settings
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
            Manage your application settings.
          </p>
        </div>

        {saved && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
            ✓ Settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Settings */}
          <div className="card rounded-xl p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
              General
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="siteName"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: 'rgb(var(--foreground))' }}
                >
                  Site Name
                </label>
                <input
                  id="siteName"
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500"
                  style={{
                    borderColor: 'rgb(var(--border))',
                    backgroundColor: 'rgb(var(--muted))',
                    color: 'rgb(var(--foreground))',
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium"
                  style={{ color: 'rgb(var(--foreground))' }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500"
                  style={{
                    borderColor: 'rgb(var(--border))',
                    backgroundColor: 'rgb(var(--muted))',
                    color: 'rgb(var(--foreground))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="card rounded-xl p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
              Features
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: 'notifications',
                  label: 'Email Notifications',
                  description: 'Send email notifications for important events.',
                  value: notifications,
                  setter: setNotifications,
                },
                {
                  id: 'maintenance',
                  label: 'Maintenance Mode',
                  description: 'Put the site in maintenance mode.',
                  value: maintenance,
                  setter: setMaintenance,
                },
                {
                  id: 'analytics',
                  label: 'Analytics Tracking',
                  description: 'Enable analytics and usage tracking.',
                  value: analytics,
                  setter: setAnalytics,
                },
              ].map((toggle) => (
                <div key={toggle.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'rgb(var(--foreground))' }}>
                      {toggle.label}
                    </p>
                    <p className="text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>
                      {toggle.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle.setter(!toggle.value)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      toggle.value ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    role="switch"
                    aria-checked={toggle.value}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        toggle.value ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: 'rgb(var(--primary))' }}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
