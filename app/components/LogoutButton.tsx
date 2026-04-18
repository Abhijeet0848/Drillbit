'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton({ style }: { style?: React.CSSProperties }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout} 
      className="btn" 
      style={style || { 
        background: 'transparent', 
        border: '1px solid #ddd', 
        color: 'var(--text-muted)' 
      }}>
      Logout
    </button>
  );
}
