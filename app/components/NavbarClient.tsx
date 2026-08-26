'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LogoutButton from './LogoutButton';

interface NavbarClientProps {
  hasSession: boolean;
}

export default function NavbarClient({ hasSession }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 1000,
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    }}>
      <nav style={{
        padding: '0.65rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '9999px',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative'
      }}>
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={closeMenu}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}
        >
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

        {/* Desktop Navigation Links */}
        <div className="nav-desktop-links" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/#features" className="nav-link">Features</Link>
          <Link href="/#products" className="nav-link">Products</Link>
          <Link href="/#contact" className="nav-link">Contact</Link>
        </div>

        {/* Desktop Actions */}
        <div className="nav-desktop-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ThemeToggle compact={true} />
          {hasSession ? (
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

        {/* Mobile Header Controls (Theme Toggle + Hamburger) */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
          <ThemeToggle compact={true} />
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'var(--primary-light)',
              border: '1px solid var(--glass-border)',
              borderRadius: '9999px',
              padding: '0.45rem',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition)'
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div 
          className="animate-fade"
          style={{
            marginTop: '0.6rem',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}
        >
          <Link 
            href="/" 
            onClick={closeMenu}
            className="nav-link" 
            style={{ padding: '0.75rem 1rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            Home
          </Link>
          <Link 
            href="/#features" 
            onClick={closeMenu}
            className="nav-link" 
            style={{ padding: '0.75rem 1rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            Features
          </Link>
          <Link 
            href="/#products" 
            onClick={closeMenu}
            className="nav-link" 
            style={{ padding: '0.75rem 1rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            Products
          </Link>
          <Link 
            href="/#contact" 
            onClick={closeMenu}
            className="nav-link" 
            style={{ padding: '0.75rem 1rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            Contact
          </Link>

          <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '0.5rem', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hasSession ? (
              <>
                <Link 
                  href="/dashboard" 
                  onClick={closeMenu}
                  className="btn btn-primary hover-lift" 
                  style={{ width: '100%', textDecoration: 'none', borderRadius: '12px', padding: '0.75rem' }}
                >
                  Dashboard
                </Link>
                <div onClick={closeMenu}>
                  <LogoutButton style={{ width: '100%', background: 'var(--bg-surface)', color: 'var(--text-main)', borderRadius: '12px', padding: '0.75rem' }} />
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  onClick={closeMenu}
                  className="btn btn-outline hover-lift" 
                  style={{ width: '100%', textDecoration: 'none', borderRadius: '12px', padding: '0.75rem' }}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  onClick={closeMenu}
                  className="btn btn-primary hover-lift" 
                  style={{ width: '100%', textDecoration: 'none', borderRadius: '12px', padding: '0.75rem' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
