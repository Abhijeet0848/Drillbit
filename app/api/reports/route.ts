import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await connectToDatabase();
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const reports = await Report.find({ userId: session.value }).sort({ createdAt: -1 });
    return NextResponse.json(reports);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const report = await Report.create({ ...body, userId: session.value });
    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
