import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import LogoutButton from '@/app/components/LogoutButton';
import ThemeToggle from '@/app/components/ThemeToggle';

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
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-main)' }}>
      {/* Sidebar */}
      <aside className="glass" style={{ 
        width: '260px', 
        margin: '1rem', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '1.5rem 0.75rem',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2.5rem', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--accent)', width: '12px', height: '12px', borderRadius: '3px' }}></div>
          Drill<span style={{ color: 'var(--accent)' }}>Bit</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <SidebarLink href="/dashboard" icon="📊" label="Overview" active />
          <SidebarLink href="/dashboard/upload" icon="📤" label="New Scan" />
          <SidebarLink href="/dashboard/reports" icon="📁" label="Reports Archive" />
          <SidebarLink href="/dashboard/settings" icon="⚙️" label="Settings" />
          
          <ThemeToggle />
        </nav>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
          <div style={{ 
            padding: '0.75rem', 
            background: 'var(--primary)', 
            color: 'white', 
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{ 
              width: '36px', 
              height: '36px', 
              background: 'var(--accent)', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              fontWeight: 800,
              fontSize: '1rem'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.7, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.institution || 'Educator'}</div>
            </div>
          </div>
          <LogoutButton style={{ width: '100%', padding: '0.6rem', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)', borderRadius: '12px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-main)' }} />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label, active = false }: { href: string, icon: string, label: string, active?: boolean }) {
  return (
    <Link href={href} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '12px',
      background: active ? 'hsla(var(--a-h), var(--a-s), var(--a-l), 0.1)' : 'transparent',
      color: active ? 'var(--accent)' : 'var(--text-muted)',
      fontWeight: active ? 600 : 500,
      transition: 'var(--transition)',
      fontSize: '0.9rem'
    }}>
      <span style={{ fontSize: '1.1rem' }}>{icon}</span>
      {label}
    </Link>
  );
}
