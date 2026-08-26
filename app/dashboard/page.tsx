import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import Report from '@/lib/models/Report';
import { FileText, Scale, Bot, HardDrive, Inbox, Clock, Plus } from 'lucide-react';
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
    { label: "Total Scans", value: reports.length.toString(), icon: <FileText size={24} /> },
    { label: "Plagiarism Avg", value: "12%", icon: <Scale size={24} /> },
    { label: "AI Content Avg", value: "8%", icon: <Bot size={24} /> },
    { label: "Storage Used", value: "4.2 GB", icon: <HardDrive size={24} /> },
  ];

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Welcome back, <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{user.name}</span>. Here's what's happening today.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/dashboard/upload" className="btn btn-primary hover-lift">
            <Plus size={18} /> New Scan
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      {/* Stats Grid */}
      <div className="animate-stagger" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', 
        gap: 'clamp(1rem, 2vw, 1.5rem)',
        marginBottom: 'clamp(2rem, 4vh, 3.5rem)'
      }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-panel hover-lift" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>{s.label}</div>
              <div style={{ color: 'var(--text-muted)' }}>{s.icon}</div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-panel">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
          <Clock size={18} /> Recent Reports
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
                  <td colSpan={5} style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', opacity: 0.5 }}>
                      <Inbox size={48} />
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>No reports found</div>
                    <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>Create a new scan to get started.</div>
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
          background: var(--primary-light);
        }
      `}</style>
    </tr>
  );
}
