import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import DashboardContainer from './DashboardContainer';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  if (!session) {
    redirect('/login');
  }

  await connectToDatabase();
  const userData = await User.findById(session.value);
  if (!userData) {
    redirect('/login');
  }
  const user = JSON.parse(JSON.stringify(userData));

  return (
    <DashboardContainer user={user}>
      {children}
    </DashboardContainer>
  );
}
