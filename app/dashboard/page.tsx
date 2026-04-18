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
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user.name}. Here's what's happening.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/dashboard/upload" className="btn btn-primary">+ New Scan</Link>
          <LogoutButton style={{ background: 'white', border: '1px solid #ddd', color: 'var(--text-muted)' }} />
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {stats.map((s, i) => (
          <div key={i} className="glass" style={{ padding: '1.5rem', background: 'white' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.icon}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass" style={{ padding: '2rem', background: 'white' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Reports</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Document Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Scanner</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Similarity</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Action</th>
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
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No reports found. Create a new scan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportRow({ id, name, type, score, status }: { id: string, name: string, type: string, score: string, status: string }) {
  const isFlagged = status === 'Flagged';
  const isRejected = status === 'Rejected';
  const isScanning = status === 'Scanning';
  const hasError = isFlagged || isRejected;
  
  return (
    <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
      <td style={{ padding: '1rem', fontWeight: 500 }}>{name}</td>
      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{type}</td>
      <td style={{ padding: '1rem' }}>
        <span style={{ 
          color: isScanning ? 'var(--text-muted)' : (hasError ? 'var(--error)' : 'var(--success)'),
          fontWeight: 600
        }}>{score}</span>
      </td>
      <td style={{ padding: '1rem' }}>
        <span style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '20px', 
          fontSize: '0.8rem',
          background: isScanning ? '#eee' : (hasError ? '#ffebee' : '#e8f5e9'),
          color: isScanning ? '#666' : (hasError ? '#c62828' : '#2e7d32')
        }}>{status}</span>
      </td>
      <td style={{ padding: '1rem' }}>
        <Link href={`/dashboard/reports/${id}`} style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--accent)', 
          fontWeight: 600, 
          cursor: 'pointer',
          textDecoration: 'none'
        }}>View Report</Link>
      </td>
    </tr>
  );
}
