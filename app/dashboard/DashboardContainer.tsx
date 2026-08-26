'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UploadCloud, FolderOpen, Settings, Menu, X, Drill } from 'lucide-react';
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
        height: '64px',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 100,
        display: 'none',
        alignItems: 'center',
        padding: '0 1.25rem',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Drill size={14} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
            DrillBit
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ThemeToggle compact={true} />
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle Dashboard Menu"
            style={{ 
              background: 'var(--primary-light)', 
              border: '1px solid var(--glass-border)', 
              borderRadius: '8px', 
              padding: '0.45rem', 
              cursor: 'pointer', 
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '3rem', padding: '0 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
          <div style={{ background: 'var(--primary)', color: 'var(--bg-main)', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Drill size={16} />
          </div>
          <span>DrillBit</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
          <SidebarLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" active={pathname === '/dashboard'} onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/dashboard/upload" icon={<UploadCloud size={18} />} label="New Scan" active={pathname === '/dashboard/upload'} onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/dashboard/reports" icon={<FolderOpen size={18} />} label="Reports Archive" active={pathname.startsWith('/dashboard/reports')} onClick={() => setSidebarOpen(false)} />
          <SidebarLink href="/dashboard/settings" icon={<Settings size={18} />} label="Settings" active={pathname === '/dashboard/settings'} onClick={() => setSidebarOpen(false)} />
          
          <div style={{ marginTop: 'auto', padding: '1rem 0' }}>
            <ThemeToggle />
          </div>
        </nav>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div className="glass-panel" style={{ 
            padding: '1rem', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--primary-light)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '1.2rem',
              flexShrink: 0,
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.institution || 'Educator'}</div>
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
            --mobile-nav-height: 64px;
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

function SidebarLink({ href, icon, label, active = false, onClick }: { href: string, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="hover-lift" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.85rem 1.25rem',
      borderRadius: '14px',
      background: active ? 'var(--primary-light)' : 'transparent',
      color: active ? 'var(--text-main)' : 'var(--text-muted)',
      fontWeight: 500,
      transition: 'var(--transition)',
      fontSize: '0.95rem',
      border: '1px solid transparent'
    }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      {label}
    </Link>
  );
}
