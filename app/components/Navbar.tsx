import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '1.5rem',
      margin: '0 2rem',
      padding: '1rem 2rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: '20px',
      border: '1px solid var(--glass-border)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div className="logo" style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
        <div style={{ background: 'var(--primary)', width: '20px', height: '20px', borderRadius: '4px' }}></div>
        <span>DrillBit</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" className="hover-lift" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Home</Link>
        <Link href="#features" className="hover-lift" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Features</Link>
        <Link href="#products" className="hover-lift" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Products</Link>
        <Link href="#contact" className="hover-lift" style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Contact</Link>
        {session ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/dashboard" className="btn btn-primary hover-lift" style={{ textDecoration: 'none' }}>Dashboard</Link>
            <LogoutButton style={{ background: 'var(--bg-surface)', color: 'var(--text-main)' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login" className="btn btn-outline hover-lift" style={{ textDecoration: 'none' }}>Login</Link>
            <Link href="/signup" className="btn btn-primary hover-lift" style={{ textDecoration: 'none' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
