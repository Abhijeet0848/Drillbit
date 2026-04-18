'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton';
import ThemeToggle from '@/app/components/ThemeToggle';

export default function DashboardContainer({
  children,
  user
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Mobile Header */}
      <header className="mobile-only" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        justifyContent: 'space-between'
      }}>
        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
          Drill<span style={{ color: 'var(--accent)' }}>Bit</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 140,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Sidebar */}
      <aside className={`glass sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ 
        width: 'var(--sidebar-width)', 
        margin: '1rem', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '1.5rem 0.75rem',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)',
        zIndex: 150,
        transition: 'var(--transition)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2.5rem', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ background: 'var(--accent)', width: '12px', height: '12px', borderRadius: '3px' }}></div>
          Drill<span style={{ color: 'var(--accent)' }}>Bit</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <SidebarLink href="/dashboard" icon="📊" label="Overview" active={pathname === '/dashboard'} onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/dashboard/upload" icon="📤" label="New Scan" active={pathname === '/dashboard/upload'} onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/dashboard/reports" icon="📁" label="Reports Archive" active={pathname.startsWith('/dashboard/reports')} onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/dashboard/settings" icon="⚙️" label="Settings" active={pathname === '/dashboard/settings'} onClick={() => setSidebarOpen(false)} />
          
          <div style={{ marginTop: 'auto', padding: '1rem 0' }}>
            <ThemeToggle />
          </div>
        </nav>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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
              fontSize: '1rem',
              flexShrink: 0
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
      <main style={{ 
        flex: 1, 
        padding: '2rem', 
        overflowY: 'auto',
        marginTop: 'var(--mobile-nav-height, 0px)',
        transition: 'var(--transition)'
      }}>
        {children}
      </main>

      <style jsx global>{`
        @media (max-width: 768px) {
          :root {
            --mobile-nav-height: 60px;
          }
          .mobile-only { display: flex !important; }
          .sidebar {
            position: fixed !important;
            top: 0;
            bottom: 0;
            left: -300px;
            width: 280px !important;
            margin: 0 !important;
            border-radius: 0 24px 24px 0 !important;
            background: var(--bg-card) !important;
          }
          .sidebar.open {
            left: 0 !important;
          }
          main {
            padding: 1.5rem 1rem !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function SidebarLink({ href, icon, label, active = false, onClick }: { href: string, icon: string, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} style={{
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
