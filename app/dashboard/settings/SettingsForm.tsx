'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsForm({ initialUser }: { initialUser: any }) {
  const [name, setName] = useState(initialUser.name);
  const [institution, setInstitution] = useState(initialUser.institution || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, institution, password })
      });
      
      if (res.ok) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setPassword('');
        router.refresh(); // Refresh to update Sidebar name
      } else {
        const error = await res.json();
        setMessage({ text: error.error || 'Update failed', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Network error', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {message.text && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: '12px', 
          background: message.type === 'success' ? 'hsla(145, 80%, 45%, 0.1)' : 'hsla(0, 85%, 60%, 0.1)',
          color: message.type === 'success' ? 'var(--success)' : 'var(--error)',
          fontWeight: 600,
          border: `1px solid ${message.type === 'success' ? 'var(--success)' : 'var(--error)'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)', color: 'var(--text-main)' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Institution</label>
          <input 
            type="text" 
            value={institution} 
            onChange={(e) => setInstitution(e.target.value)}
            style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)', color: 'var(--text-main)' }} 
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>New Password (leave blank to keep current)</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)', color: 'var(--text-main)' }} 
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn btn-primary" 
        style={{ width: 'fit-content', padding: '1rem 3rem' }}
      >
        {loading ? 'Saving Changes...' : 'Save Profile Changes'}
      </button>
    </form>
  );
}
