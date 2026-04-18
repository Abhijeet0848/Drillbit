import connectToDatabase from '@/lib/mongodb';
import Report from '@/lib/models/Report';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ReportsArchivePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) {
    redirect('/login');
  }

  await connectToDatabase();
  const reportsData = await Report.find({ userId: session.value }).sort({ createdAt: -1 });
  const reports = JSON.parse(JSON.stringify(reportsData));

  return (
    <div className="animate-fade">
      <header className="page-header" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Reports Archive</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage and search through your entire analysis history.</p>
        </div>
        <Link href="/dashboard/upload" className="btn btn-primary">+ New Scan</Link>
      </header>

      {/* Filter Bar */}
      <div className="glass filter-bar" style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Search by filename..." 
          style={{ 
            flex: 1, 
            minWidth: '200px',
            padding: '0.75rem', 
            borderRadius: '10px', 
            border: '1px solid var(--glass-border)', 
            background: 'var(--bg-surface)',
            color: 'var(--text-main)',
            outline: 'none'
          }} 
        />
        <div style={{ display: 'flex', gap: '1rem', flex: '1', minWidth: '200px' }}>
          <select style={{ flex: 1, padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--glass-border)', background: 'var(--bg-surface)', color: 'var(--text-main)' }}>
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Rejected</option>
            <option>Scanning</option>
          </select>
          <button className="btn btn-accent" style={{ padding: '0.75rem 1.5rem' }}>Filter</button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="glass table-container hide-mobile" style={{ background: 'var(--bg-card)', padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>Date</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>Filename</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>Similarity</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>AI Score</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1.25rem 1rem', fontWeight: 500 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: any) => (
              <tr key={report._id} style={{ borderBottom: '1px solid var(--bg-surface)' }}>
                <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem' }}>
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.25rem 1rem', fontWeight: 600 }}>{report.filename}</td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span style={{ color: report.similarityIndex > 15 ? 'var(--error)' : 'var(--success)', fontWeight: 700 }}>
                    {report.similarityIndex}%
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span style={{ color: report.aiScore > 20 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {report.aiScore}%
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                   <span style={{ 
                      padding: '0.35rem 0.85rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      background: report.status === 'Rejected' ? 'hsla(0, 100%, 50%, 0.1)' : 'hsla(145, 80%, 45%, 0.1)',
                      color: report.status === 'Rejected' ? 'var(--error)' : 'var(--success)'
                   }}>{report.status}</span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <Link href={`/dashboard/reports/${report._id}`} className="btn-accent" style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="mobile-only card-list" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
        {reports.map((report: any) => (
          <div key={report._id} className="glass" style={{ padding: '1.5rem', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '70%', wordBreak: 'break-all' }}>{report.filename}</div>
              <span style={{ 
                  padding: '0.25rem 0.65rem', 
                  borderRadius: '20px', 
                  fontSize: '0.7rem', 
                  fontWeight: 700,
                  background: report.status === 'Rejected' ? 'hsla(0, 100%, 50%, 0.1)' : 'hsla(145, 80%, 45%, 0.1)',
                  color: report.status === 'Rejected' ? 'var(--error)' : 'var(--success)'
              }}>{report.status}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', background: 'var(--bg-surface)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Similarity</div>
                <div style={{ color: report.similarityIndex > 15 ? 'var(--error)' : 'var(--success)', fontWeight: 800, fontSize: '1.2rem' }}>{report.similarityIndex}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>AI Content</div>
                <div style={{ color: report.aiScore > 20 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 800, fontSize: '1.2rem' }}>{report.aiScore}%</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Scanned: {new Date(report.createdAt).toLocaleDateString()}</div>
              <Link href={`/dashboard/reports/${report._id}`} className="btn btn-accent" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                View Report
              </Link>
            </div>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="glass" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-card)' }}>
           No historical data found. Start your first scan today!
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-only { display: flex !important; }
          .page-header h1 { font-size: 1.5rem !important; }
          .filter-bar { gap: 0.75rem !important; }
        }
      `}</style>
    </div>
  );
}
