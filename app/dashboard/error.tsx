'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container animate-fade" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔌</div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Connection Interrupted</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px' }}>
        We encountered an error while synchronizing your academic data. This might be due to a brief network interruption or a database timeout.
      </p>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <button 
          onClick={() => reset()}
          className="btn btn-primary"
          style={{ padding: '1rem 2rem' }}
        >
          🔄 Try Synchronizing Again
        </button>
        <Link href="/" className="btn" style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', padding: '1rem 2rem' }}>
          Back to Home
        </Link>
      </div>

      <div style={{ marginTop: '4rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem', color: '#666', maxWidth: '100%' }}>
        <strong>Error Reference:</strong> {error.message || 'Unknown persistence error'} {error.digest && `(${error.digest})`}
      </div>
    </div>
  );
}
