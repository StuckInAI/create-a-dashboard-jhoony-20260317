import { NextResponse } from 'next/server';
import { getDataSource } from '@/lib/database';
import { User } from '@/entities/User';

export async function GET() {
  try {
    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const users = await userRepo.find({ order: { createdAt: 'DESC' } });
    return NextResponse.json({ users });
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, status } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const ds = await getDataSource();
    const userRepo = ds.getRepository(User);
    const user = userRepo.create({ name, email, role: role || 'viewer', status: status || 'active' });
    const saved = await userRepo.save(user);
    return NextResponse.json({ user: saved }, { status: 201 });
  } catch (error) {
    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
