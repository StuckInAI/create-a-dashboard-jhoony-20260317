import DashboardLayout from '@/components/DashboardLayout';
import DataTable from '@/components/DataTable';
import { getDataSource } from '@/lib/database';
import { seedDatabase } from '@/lib/seed';
import { User } from '@/entities/User';

async function getUsers() {
  try {
    await seedDatabase();
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const users = await userRepo.find({ order: { createdAt: 'DESC' } });
    return { users, error: null };
  } catch (error) {
    console.error('Users fetch error:', error);
    return { users: [], error: String(error) };
  }
}

export default async function UsersPage() {
  const { users, error } = await getUsers();

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date' },
  ];

  const rows = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: new Date(u.createdAt).toLocaleDateString(),
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--foreground))' }}>
              Users
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'rgb(var(--muted-foreground))' }}>
              Manage your application users.
            </p>
          </div>
          <button
            className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'rgb(var(--primary))' }}
          >
            + Add User
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        <DataTable columns={columns} rows={rows} />
      </div>
    </DashboardLayout>
  );
}
