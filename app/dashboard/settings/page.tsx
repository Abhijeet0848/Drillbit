import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SettingsForm from './SettingsForm';

export default async function SettingsPage() {
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
    <div className="animate-fade">
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Account Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your professional identity and security settings.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 800px)', gap: '2rem' }}>
        <div className="glass" style={{ background: 'var(--bg-card)', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2.5rem' }}>
             <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'var(--accent)', 
                borderRadius: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'var(--primary)'
             }}>
               {user.name.charAt(0).toUpperCase()}
             </div>
             <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h2>
                <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
             </div>
          </div>
          
          <SettingsForm initialUser={user} />
        </div>

        <div className="glass" style={{ padding: '2rem', background: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Data Management</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
             Export your report history or permanently delete your account data.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button className="btn" style={{ border: '1px solid var(--glass-border)', background: 'white' }}>Download Data Archive</button>
             <button className="btn" style={{ color: 'var(--error)', background: 'transparent' }}>Request Account Deletion</button>
          </div>
        </div>
      </div>
    </div>
  );
}
