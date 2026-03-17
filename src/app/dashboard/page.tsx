import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { getDataSource } from '@/lib/database';
import { seedDatabase } from '@/lib/seed';
import { User } from '@/entities/User';
import { ActivityLog } from '@/entities/ActivityLog';

async function getDashboardData() {
  try {
    await seedDatabase();
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const activityRepo = ds.getRepository(ActivityLog);

    const totalUsers = await userRepo.count();
    const activeUsers = await userRepo.count({ where: { status: 'active' } });
    const recentActivity = await activityRepo.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });

    return { totalUsers, activeUsers, recentActivity, error: null };
  } catch (error) {
    console.error('Dashboard data error:', error);
    return { totalUsers: 0, activeUsers: 0, recentActivity: [], error: String(error) };
  }
}

export default async function DashboardPage() {
  const { totalUsers, activeUsers, recentActivity, error } = await getDashboardData();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--foreground))' }}>
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
            Welcome back! Here&apos;s what&apos;s happening.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers.toString()}
            description="Registered accounts"
            icon="👥"
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            title="Active Users"
            value={activeUsers.toString()}
            description="Currently active"
            icon="✅"
            trend="+5%"
            trendUp={true}
          />
          <StatCard
            title="Total Revenue"
            value="$24,500"
            description="This month"
            icon="💰"
            trend="+18%"
            trendUp={true}
          />
          <StatCard
            title="Active Sessions"
            value="142"
            description="Right now"
            icon="🔗"
            trend="-3%"
            trendUp={false}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="card rounded-xl p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
              Recent Activity
            </h2>
            {recentActivity.length === 0 ? (
              <p className="text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
                No recent activity found.
              </p>
            ) : (
              <ul className="space-y-3">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {activity.action.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium" style={{ color: 'rgb(var(--foreground))' }}>
                        {activity.action}
                      </p>
                      <p className="truncate text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>
                        {activity.description}
                      </p>
                      <p className="mt-0.5 text-xs" style={{ color: 'rgb(var(--muted-foreground))' }}>
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Stats */}
          <div className="card rounded-xl p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold" style={{ color: 'rgb(var(--foreground))' }}>
              System Status
            </h2>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', value: 42, color: 'bg-green-500' },
                { label: 'Memory Usage', value: 67, color: 'bg-yellow-500' },
                { label: 'Disk Usage', value: 31, color: 'bg-blue-500' },
                { label: 'Network Load', value: 58, color: 'bg-purple-500' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span style={{ color: 'rgb(var(--foreground))' }}>{stat.label}</span>
                    <span style={{ color: 'rgb(var(--muted-foreground))' }}>{stat.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'rgb(var(--muted))' }}>
                    <div
                      className={`h-2 rounded-full ${stat.color} transition-all duration-500`}
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
