'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('drillbit-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('drillbit-theme', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      className="btn"
      style={{ 
        width: '100%', 
        justifyContent: 'center', 
        background: 'var(--bg-surface)', 
        border: '1px solid var(--glass-border)',
        marginTop: '1rem',
        color: 'var(--text-main)',
        fontSize: '0.85rem'
      }}
    >
      {theme === 'light' ? '🌙 Night Mode' : '☀️ Day Mode'}
    </button>
  );
}
