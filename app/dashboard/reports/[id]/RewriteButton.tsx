'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Wand2 } from 'lucide-react';

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
      className={`btn btn-primary ${!isRewriting && 'hover-lift'}`}
      style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: isRewriting ? 'not-allowed' : 'pointer',
        opacity: isRewriting ? 0.7 : 1
      }}
    >
      <Wand2 size={16} />
      {isRewriting ? 'Neutralizing Plagiarism...' : 'Make Plagiarism Free'}
    </button>
  );
}
