'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type UploadType = 'single' | 'bulk' | 'text';

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState<UploadType>('single');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [pastedText, setPastedText] = useState('');
  const router = useRouter();

  const processFile = async (file: File) => {
    try {
      // 1. Parse File
      setStatusText(`Extracting: ${file.name}...`);
      const formData = new FormData();
      formData.append('file', file);
      const parseRes = await fetch('/api/parse', { method: 'POST', body: formData });
      
      let content = '';
      if (parseRes.ok) {
        const parseData = await parseRes.json();
        content = parseData.text;
      } else {
        content = `[Extraction Limited] Fallback for ${file.name}. Raw extraction failed.`;
      }

      // 2. Analyze
      setStatusText(`Analyzing: ${file.name}...`);
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content })
      });
      
      let simScore = 0;
      let aiScore = 0;
      let sources = [];
      if (analyzeRes.ok) {
        const analyzeData = await analyzeRes.json();
        simScore = analyzeData.similarityIndex;
        aiScore = analyzeData.aiScore;
        sources = analyzeData.topSources;
      }

      // 3. Save Report
      setStatusText(`Finalizing: ${file.name}...`);
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          submissionType: 'Bulk Upload',
          language: 'English',
          similarityIndex: simScore,
          aiScore: aiScore,
          status: simScore > 15 ? 'Rejected' : 'Completed',
          content: content,
          topSources: sources
        })
      });
      
      return await res.json();
    } catch (err) {
      console.error("Failed to process", file.name, err);
      return null;
    }
  };

  const startAnalysis = async () => {
    setIsUploading(true);
    setProgress(0);
    
    if (activeTab === 'text') {
      setStatusText('Processing pasted text...');
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: pastedText })
      });
      const analyzeData = await res.json();
      
      const saveRes = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'Pasted Content Scan',
          submissionType: 'Manual Paste',
          language: 'English',
          similarityIndex: analyzeData.similarityIndex,
          aiScore: analyzeData.aiScore,
          status: analyzeData.similarityIndex > 15 ? 'Rejected' : 'Completed',
          content: pastedText,
          topSources: analyzeData.topSources
        })
      });
      const data = await saveRes.json();
      router.push(`/dashboard/reports/${data._id}`);
      return;
    }

    // Process Files (Single or Bulk)
    const fileList = activeTab === 'bulk' ? files : [files[0]];
    const total = fileList.length;
    let lastReportId = '';

    for (let i = 0; i < total; i++) {
      const percentage = Math.round((i / total) * 100);
      setProgress(percentage);
      const report = await processFile(fileList[i]);
      if (report) lastReportId = report._id;
      
      // Throttle slightly to avoid API flooding
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setProgress(100);
    setStatusText('All files processed successfully!');
    
    setTimeout(() => {
      if (total === 1) {
        router.push(`/dashboard/reports/${lastReportId}`);
      } else {
        router.push('/dashboard/reports');
      }
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="animate-fade">
      <header className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Platinum Scan</h1>
        <p style={{ color: 'var(--text-muted)' }}>Choose your method for multi-platform analysis and integrity verification.</p>
      </header>

      {/* Tabs */}
      <div className="tab-container" style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <TabButton active={activeTab === 'single'} onClick={() => { setActiveTab('single'); setFiles([]); }} label="Single Analysis" icon="📄" />
        <TabButton active={activeTab === 'bulk'} onClick={() => { setActiveTab('bulk'); setFiles([]); }} label="Bulk Engine" icon="📚" />
        <TabButton active={activeTab === 'text'} onClick={() => { setActiveTab('text'); setFiles([]); }} label="Secure Paste" icon="✍️" />
      </div>

      <div className="glass upload-card" style={{ 
        padding: '2.5rem', 
        background: 'var(--bg-card)', 
        borderRadius: '24px',
        border: '1px solid var(--glass-border)'
      }}>
        {!isUploading ? (
          <div className="upload-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem' }}>
            <div className="dropzone" style={{ 
              border: '2px dashed var(--glass-border)', 
              borderRadius: '20px', 
              padding: '2.5rem', 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '300px',
              background: 'var(--bg-surface)'
            }}>
              {activeTab === 'text' ? (
                <textarea 
                  placeholder="Paste context for secure analysis..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none', 
                    outline: 'none', 
                    resize: 'none',
                    fontSize: '1rem',
                    background: 'transparent',
                    color: 'var(--text-main)',
                    minHeight: '200px'
                  }}
                />
              ) : (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{activeTab === 'bulk' ? '📂' : '📄'}</div>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                    {files.length > 0 ? `${files.length} document(s) loaded` : 'Drop documents here'}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    PDF, DOCX, and TXT supported
                  </p>
                  <input 
                    type="file" 
                    multiple={activeTab === 'bulk'}
                    id="fileInput" 
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <button className="btn btn-accent" style={{ margin: '0 auto' }} onClick={() => document.getElementById('fileInput')?.click()}>
                    Browse Files
                  </button>
                </>
              )}
            </div>

            <div className="upload-options" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Precision</label>
                <select style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-card)', color: 'var(--text-main)' }}>
                  <option>Standard Search</option>
                  <option>Deep Neural Search</option>
                  <option>Institutional Archives</option>
                </select>
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: 'auto', padding: '1.25rem' }}
                onClick={startAnalysis}
                disabled={(activeTab === 'text' && !pastedText) || (activeTab !== 'text' && files.length === 0)}
              >
                Launch Analysis
              </button>
            </div>
          </div>
        ) : (
          <div className="progress-container" style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.4rem' }}>{statusText}</h2>
            <div className="progress-bar-bg" style={{ 
              width: '100%', 
              height: '10px', 
              background: 'var(--bg-surface)', 
              borderRadius: '5px',
              overflow: 'hidden',
              marginBottom: '1rem',
              border: '1px solid var(--glass-border)'
            }}>
              <div className="progress-bar-fill" style={{ 
                width: `${progress}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--accent), #33e1ff)', 
                transition: 'width 0.4s ease' 
              }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--accent)' }}>Overall Progress</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .page-header h1 { font-size: 1.5rem !important; }
          .tab-container { gap: 0.5rem !important; }
          .upload-card { padding: 1.5rem !important; }
          .upload-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .dropzone { padding: 1.5rem !important; min-height: 250px !important; }
          .upload-options { margin-top: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
}

function TabButton({ active, label, icon, onClick }: { active: boolean, label: string, icon: string, onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '0.85rem 1.75rem',
      borderRadius: '14px',
      background: active ? 'var(--primary)' : 'var(--bg-card)',
      color: active ? 'white' : 'var(--text-muted)',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      boxShadow: active ? '0 10px 20px -5px rgba(10,37,64,0.3)' : 'none',
      transition: 'var(--transition)',
      border: active ? 'none' : '1px solid var(--glass-border)'
    }}>
      <span>{icon}</span>
      {label}
    </button>
  );
}
