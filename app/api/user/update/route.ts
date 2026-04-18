import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function PUT(request: Request) {
  try {
    const { name, institution, password } = await request.json();
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const updateData: any = { name, institution };
    
    if (password && password.trim() !== '') {
      updateData.passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    }

    const user = await User.findByIdAndUpdate(session.value, updateData, { new: true });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, name: user.name });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
