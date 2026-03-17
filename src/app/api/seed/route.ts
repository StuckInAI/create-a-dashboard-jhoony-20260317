import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function POST() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/seed error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await seedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/seed error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
