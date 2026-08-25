'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="btn" style={{ width: compact ? '36px' : '100%', height: compact ? '36px' : 'auto', padding: compact ? '0' : '0.5rem', justifyContent: 'center', background: compact ? 'transparent' : 'var(--bg-surface)', border: compact ? 'none' : '1px solid var(--glass-border)', color: 'var(--text-muted)', borderRadius: compact ? '50%' : 'var(--border-radius)', cursor: 'default' }} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button 
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="btn hover-lift"
      title="Toggle Theme"
      style={{ 
        width: compact ? '36px' : '100%', 
        height: compact ? '36px' : 'auto',
        padding: compact ? '0' : '0.5rem',
        justifyContent: 'center', 
        alignItems: 'center',
        display: 'flex',
        gap: compact ? '0' : '0.5rem',
        background: compact ? 'transparent' : 'var(--bg-surface)', 
        border: compact ? 'none' : '1px solid var(--glass-border)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        borderRadius: compact ? '50%' : 'var(--border-radius)',
        cursor: 'pointer',
        transition: 'color 0.2s ease'
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-main)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      {!compact && (isDark ? 'Light Mode' : 'Dark Mode')}
    </button>
  );
}
