interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: string;
  trend: string;
  trendUp: boolean;
}

export default function StatCard({ title, value, description, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="card rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--muted-foreground))' }}>
            {title}
          </p>
          <p className="mt-1 text-3xl font-bold" style={{ color: 'rgb(var(--foreground))' }}>
            {value}
          </p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            trendUp
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {trendUp ? '↑' : '↓'} {trend}
        </span>
        <span className="text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>
          {description}
        </span>
      </div>
    </div>
  );
}
