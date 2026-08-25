import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Report from '@/lib/models/Report';
import LogoutButton from '@/app/components/LogoutButton';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  if (!session) {
    redirect('/login');
  }

  await connectToDatabase();
  const userData = await User.findById(session.value);
  
  if (!userData) {
    // If user was deleted from DB but cookie persists, clear the session and redirect
    redirect('/login');
  }

  const reportsData = await Report.find({ userId: session.value }).sort({ createdAt: -1 });
  const reports = JSON.parse(JSON.stringify(reportsData));
  const user = JSON.parse(JSON.stringify(userData));

  const stats = [
    { label: "Total Scans", value: reports.length.toString(), icon: "📄" },
    { label: "Plagiarism Avg", value: "12%", icon: "⚖️" },
    { label: "AI Content Avg", value: "8%", icon: "🤖" },
    { label: "Storage Used", value: "4.2 GB", icon: "💾" },
  ];

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }} className="gradient-text">Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Welcome back, <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{user.name}</span>. Here's what's happening today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/dashboard/upload" className="btn btn-primary hover-lift">
            <span style={{ fontSize: '1.2rem' }}>+</span> New Scan
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      {/* Stats Grid */}
      <div className="animate-stagger" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3.5rem'
      }}>
        {stats.map((s, i) => (
          <div key={i} className="glass hover-lift" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '6rem', opacity: 0.04, transform: 'rotate(15deg)' }}>{s.icon}</div>
            <div style={{ fontSize: '1.8rem', marginBottom: '1.25rem', display: 'inline-block', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>{s.icon}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-panel">
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--accent)' }}>✦</span> Recent Reports
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--glass-border)' }}>
                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Document Name</th>
                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scanner</th>
                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Similarity</th>
                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                <th style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report: any) => (
                <ReportRow 
                  key={report._id} 
                  id={report._id}
                  name={report.filename} 
                  type={report.submissionType} 
                  score={`${report.similarityIndex}%`} 
                  status={report.status} 
                />
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📂</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>No reports found</div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Create a new scan to get started.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReportRow({ id, name, type, score, status }: { id: string, name: string, type: string, score: string, status: string }) {
  const isFlagged = status === 'Flagged';
  const isRejected = status === 'Rejected';
  const isScanning = status === 'Scanning';
  const hasError = isFlagged || isRejected;
  let badgeClass = 'badge-neutral';
  if (status === 'Completed' || status === 'Clean') badgeClass = 'badge-success';
  if (hasError) badgeClass = 'badge-error';
  
  return (
    <tr style={{ borderBottom: '1px solid var(--glass-border)', transition: 'var(--transition)' }} className="table-row-hover">
      <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--text-main)' }}>{name}</td>
      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>{type}</td>
      <td style={{ padding: '1.25rem 1rem' }}>
        <span style={{ 
          color: isScanning ? 'var(--text-muted)' : (hasError ? 'var(--error)' : 'var(--success)'),
          fontWeight: 700,
          fontSize: '1.1rem'
        }}>{score}</span>
      </td>
      <td style={{ padding: '1.25rem 1rem' }}>
        <span className={`badge ${badgeClass}`}>{status}</span>
      </td>
      <td style={{ padding: '1.25rem 1rem' }}>
        <Link href={`/dashboard/reports/${id}`} className="btn btn-outline" style={{ 
          padding: '0.4rem 1rem',
          fontSize: '0.85rem'
        }}>View Report</Link>
      </td>
      <style>{`
        .table-row-hover:hover {
          background: hsla(var(--primary-h), var(--primary-s), 50%, 0.05);
        }
      `}</style>
    </tr>
  );
}
