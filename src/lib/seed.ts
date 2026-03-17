import 'reflect-metadata';
import { getDataSource } from './database';
import { User } from '@/entities/User';
import { ActivityLog } from '@/entities/ActivityLog';

const sampleUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' as const, status: 'active' as const },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'editor' as const, status: 'active' as const },
  { name: 'Carol White', email: 'carol@example.com', role: 'viewer' as const, status: 'inactive' as const },
  { name: 'David Brown', email: 'david@example.com', role: 'editor' as const, status: 'active' as const },
  { name: 'Eva Martinez', email: 'eva@example.com', role: 'viewer' as const, status: 'pending' as const },
  { name: 'Frank Lee', email: 'frank@example.com', role: 'viewer' as const, status: 'active' as const },
  { name: 'Grace Kim', email: 'grace@example.com', role: 'editor' as const, status: 'active' as const },
  { name: 'Henry Wilson', email: 'henry@example.com', role: 'viewer' as const, status: 'inactive' as const },
];

const sampleActivities = [
  { action: 'USER_LOGIN', description: 'User logged in from 192.168.1.1', userId: 1 },
  { action: 'USER_CREATED', description: 'New user account created', userId: 1 },
  { action: 'SETTINGS_UPDATED', description: 'Site settings were updated', userId: 1 },
  { action: 'USER_LOGIN', description: 'User logged in from 10.0.0.5', userId: 2 },
  { action: 'REPORT_GENERATED', description: 'Monthly report generated', userId: 2 },
  { action: 'USER_UPDATED', description: 'User profile updated', userId: 3 },
  { action: 'USER_LOGIN', description: 'User logged in from 172.16.0.1', userId: 4 },
  { action: 'DATA_EXPORTED', description: 'User data exported to CSV', userId: 1 },
  { action: 'PASSWORD_CHANGED', description: 'User password changed', userId: 5 },
  { action: 'USER_DEACTIVATED', description: 'User account deactivated', userId: 1 },
];

export async function seedDatabase(): Promise<{ seeded: boolean; message: string }> {
  const ds = await getDataSource();
  const userRepo = ds.getRepository(User);
  const activityRepo = ds.getRepository(ActivityLog);

  const existingUsers = await userRepo.count();
  if (existingUsers > 0) {
    return { seeded: false, message: 'Database already seeded' };
  }

  for (const userData of sampleUsers) {
    const user = userRepo.create(userData);
    await userRepo.save(user);
  }

  for (const actData of sampleActivities) {
    const act = activityRepo.create(actData);
    await activityRepo.save(act);
  }

  return { seeded: true, message: 'Database seeded successfully' };
}
