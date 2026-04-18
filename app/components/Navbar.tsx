import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: '1rem',
      margin: '0 2rem',
      padding: '1rem 2rem',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
        Drill<span style={{ color: 'var(--accent)' }}>Bit</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: 500 }}>Home</Link>
        <Link href="#features" style={{ fontWeight: 500 }}>Features</Link>
        <Link href="#products" style={{ fontWeight: 500 }}>Products</Link>
        <Link href="#contact" style={{ fontWeight: 500 }}>Contact</Link>
        {session ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>Dashboard</Link>
            <LogoutButton />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
            <Link href="/signup" className="btn btn-accent" style={{ textDecoration: 'none' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
