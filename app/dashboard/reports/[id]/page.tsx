import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';
import { notFound } from 'next/navigation';
import { AlertTriangle, Share2 } from 'lucide-react';
import RewriteButton from './RewriteButton';
import PrintButton from './PrintButton';

export const dynamic = 'force-dynamic';

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  await connectToDatabase();
  let reportData;
  try {
    reportData = await Report.findById(id);
  } catch (e) {
    return notFound();
  }

  if (!reportData) {
    return notFound();
  }

  const report = JSON.parse(JSON.stringify(reportData));
  const simIndex = report.similarityIndex;
  const aiScore = report.aiScore;

  return (
    <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%' }}>
      <header className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>Analysis Certificate</h1>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--text-main)', fontWeight: 500 }}>{report.filename}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>ID:</span> {report._id.slice(-8).toUpperCase()} <span style={{ opacity: 0.5 }}>|</span> <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Scanned:</span> {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {(simIndex > 0 || aiScore > 0) && (
            <RewriteButton reportId={report._id.toString()} />
          )}
          <PrintButton />
          <button className="btn btn-outline hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Share2 size={16} /> Share Result
          </button>
        </div>
      </header>

      {/* JNU Compliance Warning */}
      {simIndex > 15 && (
        <div className="glass-panel" style={{ 
          background: 'hsla(350, 80%, 55%, 0.1)', 
          border: '1px solid var(--error)', 
          padding: '1.5rem', 
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ color: 'var(--error)' }}><AlertTriangle size={32} /></div>
          <div>
            <div style={{ fontWeight: 800, color: 'var(--error)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>CRITICAL: Similarity Alert ({simIndex}%)</div>
            <div style={{ color: 'var(--text-main)' }}>This document exceeds the 15% threshold and will be flagged for rejection by JNU standards.</div>
          </div>
        </div>
      )}

      <div className="report-grid animate-stagger" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', flex: 1, minHeight: 0 }}>
        {/* Sidebar Analysis (Order 1 on mobile) */}
        <div className="no-print sidebar-stats" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Similarity Chart */}
          <div className="glass-panel hover-lift" style={{ textAlign: 'center', position: 'relative' }}>
             <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Similarity Score</h3>
             <div style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                background: `conic-gradient(${simIndex > 15 ? 'var(--error)' : 'var(--success)'} ${simIndex}%, var(--bg-surface) 0)`,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
             }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                   <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{simIndex}<small style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>%</small></span>
                </div>
             </div>
          </div>

          {/* AI Score */}
          <div className="glass-panel hover-lift" style={{ textAlign: 'center' }}>
             <h3 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Confidence</h3>
             <div style={{ 
                width: '150px', 
                height: '150px', 
                borderRadius: '50%', 
                background: `conic-gradient(var(--accent) ${aiScore}%, var(--bg-surface) 0)`,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
             }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                   <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>{aiScore}<small style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>%</small></span>
                </div>
             </div>
          </div>

          {/* Top Matches (Hidden or Shrunken on mobile) */}
          <div className="glass-panel hide-mobile hover-lift" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Global Matches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {report.topSources && report.topSources.length > 0 ? (
                report.topSources.map((source: any, i: number) => (
                  <SourceItem key={i} rank={i + 1} url={source.url} percentage={`${source.percentage}%`} />
                ))
              ) : (
                <div style={{ color: 'var(--success)', fontSize: '1rem', textAlign: 'center', fontWeight: 600, padding: '2rem 0' }}>✓ Secure & Clean</div>
              )}
            </div>
          </div>
        </div>

        {/* Document Viewer (Order 2 on mobile) */}
        <div className="glass doc-viewport" style={{ 
          background: 'var(--bg-card)', 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '600px',
          borderRadius: 'var(--border-radius)',
          border: '1px solid var(--glass-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ 
            padding: '1.25rem 1.5rem', 
            borderBottom: '1px solid var(--glass-border)', 
            display: 'flex', 
            justifyContent: 'space-between',
            background: 'var(--bg-surface)',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem' }}>Verification Viewport</span>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', fontWeight: 700 }}>
              <span style={{ color: 'var(--error)' }}>● PLAGIARISM</span>
              <span style={{ color: 'var(--accent)' }}>● AI MARKERS</span>
            </div>
          </div>
          <div className="printable-content" style={{ 
            padding: '2rem', 
            overflowY: 'auto', 
            lineHeight: '1.8',
            fontSize: '1rem',
            color: 'var(--text-main)',
            textAlign: 'justify',
            whiteSpace: 'pre-wrap',
            fontFamily: 'serif'
          }}>
            {report.content || "No content extracted."}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .report-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .sidebar-stats {
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 1rem !important;
            -webkit-overflow-scrolling: touch !important;
          }
          .sidebar-stats > div {
            min-width: 200px !important;
          }
          .doc-viewport {
            min-height: auto !important;
          }
          .hide-mobile { display: none !important; }
        }
        @media (max-width: 600px) {
          .sidebar-stats {
            flex-direction: column !important;
          }
          .sidebar-stats > div {
            min-width: 100% !important;
          }
          header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          header div:last-child {
            width: 100% !important;
          }
          header div:last-child button, 
          header div:last-child .btn {
            flex: 1 !important;
            justify-content: center !important;
          }
          .printable-content {
            padding: 1.5rem !important;
            font-size: 0.95rem !important;
          }
        }
      `}} />

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          .glass { box-shadow: none !important; border: 1px solid #ddd !important; }
          body { background: white !important; }
          .report-grid { display: block !important; }
          .printable-content { overflow: visible !important; height: auto !important; padding: 20mm !important; }
        }
      `}} />
    </div>
  );
}

function SourceItem({ rank, url, percentage }: { rank: number, url: string, percentage: string }) {
  return (
    <div className="glass" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.25rem',
      background: 'var(--bg-surface)',
      border: '1px solid var(--glass-border)',
      borderRadius: '12px',
      transition: 'var(--transition)',
      cursor: 'default'
    }}>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>#{rank} RANKED SOURCE</div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: 'var(--primary)' }}>{url}</div>
      </div>
      <div style={{ fontWeight: 800, color: 'var(--error)', fontSize: '1.2rem', paddingLeft: '1rem' }}>{percentage}</div>
    </div>
  );
}
