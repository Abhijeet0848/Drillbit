'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RewriteButton({ reportId }: { reportId: string }) {
  const [isRewriting, setIsRewriting] = useState(false);
  const router = useRouter();

  const handleRewrite = async () => {
    setIsRewriting(true);
    
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          similarityIndex: 0,
          aiScore: 0,
          status: 'Completed',
          content: "[AI Paraphrased Version]\n\nThis text has been algorithmically rewritten to eliminate academic similarities and AI fingerprints while preserving the original conceptual meaning. The document is now safe for submission."
        })
      });
      
      router.refresh(); // Refresh the Server Component to show new scores!
    } catch (error) {
      console.error('Failed to rewrite', error);
    } finally {
      setIsRewriting(false);
    }
  };

  return (
    <button 
      onClick={handleRewrite}
      disabled={isRewriting}
      className="btn"
      style={{ 
        background: isRewriting ? '#ddd' : 'var(--primary)', 
        color: isRewriting ? '#666' : 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: isRewriting ? 'not-allowed' : 'pointer'
      }}
    >
      {isRewriting ? '✨ Neutralizing Plagiarism...' : '✨ Make Plagiarism Free'}
    </button>
  );
}
