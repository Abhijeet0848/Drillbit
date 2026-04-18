import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    await connectToDatabase();
    
    const report = await Report.findById(id);
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    await connectToDatabase();
    
    const updatedReport = await Report.findByIdAndUpdate(
      id, 
      { $set: body },
      { new: true }
    );
    
    if (!updatedReport) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedReport);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
