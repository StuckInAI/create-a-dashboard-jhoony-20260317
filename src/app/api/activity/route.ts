import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { ActivityLog } from '@/entities/ActivityLog';

export async function GET() {
  try {
    const ds = await getDataSource();
    const activityRepo = ds.getRepository(ActivityLog);
    const activities = await activityRepo.find({ order: { createdAt: 'DESC' } });
    return NextResponse.json({ activities });
  } catch (error) {
    console.error('GET /api/activity error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, description, userId } = body;

    if (!action || !description) {
      return NextResponse.json({ error: 'Action and description are required' }, { status: 400 });
    }

    const ds = await getDataSource();
    const activityRepo = ds.getRepository(ActivityLog);
    const activity = activityRepo.create({ action, description, userId: userId || null });
    const saved = await activityRepo.save(activity);
    return NextResponse.json({ activity: saved }, { status: 201 });
  } catch (error) {
    console.error('POST /api/activity error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
