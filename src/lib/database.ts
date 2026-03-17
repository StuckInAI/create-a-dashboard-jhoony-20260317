import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@/entities/User';
import { ActivityLog } from '@/entities/ActivityLog';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH
  ? path.resolve(process.cwd(), process.env.DATABASE_PATH)
  : path.resolve(process.cwd(), 'database.sqlite');

let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }

  dataSource = new DataSource({
    type: 'better-sqlite3',
    database: DB_PATH,
    entities: [User, ActivityLog],
    synchronize: true,
    logging: false,
  });

  await dataSource.initialize();
  return dataSource;
}
