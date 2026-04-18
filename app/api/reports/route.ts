import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';
import { cookies } from 'next/headers';

// Notice the second argument 'context' is used to access params as a Promise
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await the params first
    const { id } = await context.params;

    await connectToDatabase();

    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Use the awaited 'id' to find the specific report
    const report = await Report.findOne({ _id: id, userId: session.value });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Do the same for DELETE or PATCH if you have them in this file
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();

    const cookieStore = await cookies();
    const session = cookieStore.get('session');

    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await Report.deleteOne({ _id: id, userId: session.value });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}