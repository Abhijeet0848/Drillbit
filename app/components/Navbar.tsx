import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';
import ThemeToggle from './ThemeToggle';

export default async function Navbar() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return (
    <header style={{
      position: 'sticky',
      top: '1.25rem',
      zIndex: 1000,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
    }}>
      <nav style={{
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '9999px',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-md)',
      }}>
        {/* Brand Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            DrillBit
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="#features" className="nav-link">Features</Link>
          <Link href="#products" className="nav-link">Products</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ThemeToggle compact={true} />
          {session ? (
            <>
              <Link href="/dashboard" className="btn btn-primary hover-lift" style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1.1rem', borderRadius: '9999px' }}>
                Dashboard
              </Link>
              <LogoutButton style={{ background: 'var(--bg-surface)', color: 'var(--text-main)', borderRadius: '9999px', padding: '0.5rem 1rem', fontSize: '0.875rem' }} />
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline hover-lift" style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1.1rem', borderRadius: '9999px' }}>
                Login
              </Link>
              <Link href="/signup" className="btn btn-primary hover-lift" style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1.15rem', borderRadius: '9999px' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
