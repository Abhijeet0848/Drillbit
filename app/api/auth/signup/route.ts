import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { name, email, institution, password } = await request.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await User.create({
      name,
      email,
      institution,
      passwordHash
    });

    // Set a very basic auth cookie (In production use jwt)
    const cookieStore = await cookies();
    cookieStore.set('session', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
