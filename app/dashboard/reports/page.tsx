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
      <header className="page-header" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }} className="gradient-text">Reports Archive</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Manage and search through your entire analysis history.</p>
        </div>
        <Link href="/dashboard/upload" className="btn btn-primary hover-lift">
          <span style={{ fontSize: '1.2rem' }}>+</span> New Scan
        </Link>
      </header>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', padding: '1.5rem' }}>
        <input 
          type="text" 
          placeholder="Search by filename..." 
          className="input-field"
          style={{ flex: 1, minWidth: '200px' }} 
        />
        <div style={{ display: 'flex', gap: '1rem', flex: '1', minWidth: '200px' }}>
          <select className="input-field" style={{ flex: 1 }}>
            <option>All Statuses</option>
            <option>Completed</option>
            <option>Rejected</option>
            <option>Scanning</option>
          </select>
          <button className="btn btn-primary">Filter</button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="glass-panel hide-mobile" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
              <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
              <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filename</th>
              <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Similarity</th>
              <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Score</th>
              <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: any) => {
              let badgeClass = 'badge-neutral';
              if (report.status === 'Completed' || report.status === 'Clean') badgeClass = 'badge-success';
              if (report.status === 'Rejected' || report.status === 'Flagged') badgeClass = 'badge-error';
              
              return (
              <tr key={report._id} className="table-row-hover" style={{ borderBottom: '1px solid var(--glass-border)', transition: 'var(--transition)' }}>
                <td style={{ padding: '1.25rem 1rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{report.filename}</td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span style={{ color: report.similarityIndex > 15 ? 'var(--error)' : 'var(--success)', fontWeight: 700, fontSize: '1.1rem' }}>
                    {report.similarityIndex}%
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span style={{ color: report.aiScore > 20 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 700, fontSize: '1.1rem' }}>
                    {report.aiScore}%
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                   <span className={`badge ${badgeClass}`}>{report.status}</span>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <Link href={`/dashboard/reports/${report._id}`} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
                    View Report
                  </Link>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="mobile-only card-list animate-stagger" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
        {reports.map((report: any) => {
          let badgeClass = 'badge-neutral';
          if (report.status === 'Completed' || report.status === 'Clean') badgeClass = 'badge-success';
          if (report.status === 'Rejected' || report.status === 'Flagged') badgeClass = 'badge-error';

          return (
          <div key={report._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '70%', wordBreak: 'break-all' }}>{report.filename}</div>
              <span className={`badge ${badgeClass}`}>{report.status}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 600 }}>Similarity</div>
                <div style={{ color: report.similarityIndex > 15 ? 'var(--error)' : 'var(--success)', fontWeight: 800, fontSize: '1.3rem' }}>{report.similarityIndex}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem', fontWeight: 600 }}>AI Content</div>
                <div style={{ color: report.aiScore > 20 ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 800, fontSize: '1.3rem' }}>{report.aiScore}%</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(report.createdAt).toLocaleDateString()}</div>
              <Link href={`/dashboard/reports/${report._id}`} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                View
              </Link>
            </div>
          </div>
        )})}
      </div>

      {reports.length === 0 && (
        <div className="glass-panel" style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
           <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.5 }}>🗃️</div>
           <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>No historical data found</div>
           <div style={{ marginTop: '0.5rem' }}>Start your first scan today to see reports here!</div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row-hover:hover {
          background: hsla(var(--primary-h), var(--primary-s), 50%, 0.05);
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}} />
    </div>
  );
}
