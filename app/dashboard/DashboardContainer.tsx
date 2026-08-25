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
        margin: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '2rem 1rem',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)',
        zIndex: 150,
        transition: 'var(--transition)'
      }}>
        <div style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '3rem', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', width: '16px', height: '16px', borderRadius: '4px', boxShadow: '0 0 15px var(--accent-glow)' }}></div>
          <span className="gradient-text">DrillBit</span>
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
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div className="glass" style={{ 
            padding: '1rem', 
            background: 'linear-gradient(135deg, hsla(var(--primary-h), var(--primary-s), 20%, 0.5), hsla(var(--accent-h), var(--accent-s), 20%, 0.5))',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            border: '1px solid hsla(var(--accent-h), var(--accent-s), 50%, 0.3)'
          }}>
            <div className="glow-active" style={{ 
              width: '42px', 
              height: '42px', 
              background: 'linear-gradient(135deg, var(--primary), var(--accent))', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 800,
              fontSize: '1.2rem',
              flexShrink: 0,
              boxShadow: '0 0 20px var(--accent-glow)'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.institution || 'Educator'}</div>
            </div>
          </div>
          <LogoutButton style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--glass-border)', background: 'var(--bg-card)', borderRadius: '14px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, transition: 'var(--transition)' }} />
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
    <Link href={href} onClick={onClick} className="hover-lift" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.85rem 1.25rem',
      borderRadius: '14px',
      background: active ? 'hsla(var(--primary-h), var(--primary-s), 50%, 0.15)' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      fontWeight: active ? 700 : 500,
      transition: 'var(--transition)',
      fontSize: '0.95rem',
      border: active ? '1px solid hsla(var(--primary-h), var(--primary-s), 50%, 0.2)' : '1px solid transparent'
    }}>
      <span style={{ fontSize: '1.2rem', filter: active ? 'drop-shadow(0 0 8px var(--accent-glow))' : 'none' }}>{icon}</span>
      {label}
    </Link>
  );
}
