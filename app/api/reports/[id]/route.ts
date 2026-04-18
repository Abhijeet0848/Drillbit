import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const report = await Report.findById(params.id);
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Allow updating similarityIndex and aiScore dynamically
    const updatedReport = await Report.findByIdAndUpdate(
      params.id, 
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
