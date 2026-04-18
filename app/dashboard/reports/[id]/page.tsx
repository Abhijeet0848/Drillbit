import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';
import { notFound } from 'next/navigation';
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
      <header className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Analysis Certificate: {report.filename}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Reference ID: {report._id.slice(-8).toUpperCase()} • Scanned: {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {(simIndex > 0 || aiScore > 0) && (
            <RewriteButton reportId={report._id.toString()} />
          )}
          <PrintButton />
          <button className="btn" style={{ background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>Share Result</button>
        </div>
      </header>

      {/* JNU Compliance Warning */}
      {simIndex > 15 && (
        <div style={{ 
          background: 'hsla(0, 85%, 60%, 0.1)', 
          border: '1px solid var(--error)', 
          color: 'var(--error)', 
          padding: '1.25rem 1.5rem', 
          borderRadius: '16px', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <span>CRITICAL: Similarity Alert ({simIndex}%). This document exceeds the 15% threshold and will be flagged for rejection by JNU standards.</span>
        </div>
      )}

      <div className="report-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', flex: 1, minHeight: 0 }}>
        {/* Sidebar Analysis (Order 1 on mobile) */}
        <div className="no-print sidebar-stats" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Similarity Chart */}
          <div className="glass" style={{ padding: '2rem 1.5rem', background: 'var(--bg-card)', textAlign: 'center', position: 'relative' }}>
             <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Similarity Score</h3>
             <div style={{ 
                width: '140px', 
                height: '140px', 
                borderRadius: '50%', 
                background: `conic-gradient(${simIndex > 15 ? 'var(--error)' : 'var(--success)'} ${simIndex}%, var(--bg-surface) 0)`,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
             }}>
                <div style={{ 
                  width: '110px', 
                  height: '110px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                   <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{simIndex}<small style={{ fontSize: '0.8rem' }}>%</small></span>
                </div>
             </div>
          </div>

          {/* AI Score */}
          <div className="glass" style={{ padding: '2rem 1.5rem', background: 'var(--bg-card)', textAlign: 'center' }}>
             <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Confidence</h3>
             <div style={{ 
                width: '140px', 
                height: '140px', 
                borderRadius: '50%', 
                background: `conic-gradient(var(--accent) ${aiScore}%, var(--bg-surface) 0)`,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
             }}>
                <div style={{ 
                  width: '110px', 
                  height: '110px', 
                  borderRadius: '50%', 
                  background: 'var(--bg-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                   <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>{aiScore}<small style={{ fontSize: '0.8rem' }}>%</small></span>
                </div>
             </div>
          </div>

          {/* Top Matches (Hidden or Shrunken on mobile) */}
          <div className="glass hide-mobile" style={{ padding: '1.5rem', background: 'var(--bg-card)', flex: 1 }}>
            <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '1.25rem', fontWeight: 700 }}>Global Matches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {report.topSources && report.topSources.length > 0 ? (
                report.topSources.map((source: any, i: number) => (
                  <SourceItem key={i} rank={i + 1} url={source.url} percentage={`${source.percentage}%`} />
                ))
              ) : (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>Secure</div>
              )}
            </div>
          </div>
        </div>

        {/* Document Viewer (Order 2 on mobile) */}
        <div className="glass doc-viewport" style={{ 
          background: 'var(--bg-card)', 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '500px',
          borderRadius: '24px',
          overflow: 'hidden'
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

      <style jsx global>{`
        @media (max-width: 992px) {
          .report-grid {
            gridTemplateColumns: 1fr !important;
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
      `}</style>

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
      padding: '1rem',
      background: 'var(--bg-surface)',
      border: '1px solid var(--glass-border)',
      borderRadius: '12px'
    }}>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>#{rank} RANKED SOURCE</div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: 'var(--primary)' }}>{url}</div>
      </div>
      <div style={{ fontWeight: 800, color: 'var(--error)', fontSize: '1rem', paddingLeft: '1rem' }}>{percentage}</div>
    </div>
  );
}
