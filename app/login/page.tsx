'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to login');
      }
      
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass animate-fade" style={{ padding: '3rem', width: '100%', maxWidth: '400px', background: 'white' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Login</h1>
        {error && <div style={{ color: 'var(--error)', background: '#ffebee', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" name="email" required placeholder="prof.abhijeet@university.edu" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input type="password" name="password" required placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '1rem', opacity: loading ? 0.7 : 1 }}>{loading ? 'Logging in...' : 'Login to Dashboard'}</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
           <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>&larr; Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
