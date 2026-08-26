import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: 'clamp(3rem, 6vh, 6rem) clamp(1rem, 4vw, 2rem) 2rem' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', 
          gap: 'clamp(2rem, 4vw, 4rem)',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)'
        }}>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
              <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', width: '20px', height: '20px', borderRadius: '4px' }}></div>
              <span>DrillBit</span>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '0.95rem' }}>
              Driving academic integrity through advanced AI and plagiarism detection technology.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link href="/#products" style={{ color: 'var(--text-muted)' }} className="hover-lift">Institutional Portal</Link></li>
              <li><Link href="/#products" style={{ color: 'var(--text-muted)' }} className="hover-lift">Research Checker</Link></li>
              <li><Link href="/#products" style={{ color: 'var(--text-muted)' }} className="hover-lift">API Integration</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link href="/#features" style={{ color: 'var(--text-muted)' }} className="hover-lift">About Platform</Link></li>
              <li><Link href="/#contact" style={{ color: 'var(--text-muted)' }} className="hover-lift">Contact Support</Link></li>
              <li><Link href="/signup" style={{ color: 'var(--text-muted)' }} className="hover-lift">Get Started</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid var(--glass-border)', 
          paddingTop: '2rem', 
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          &copy; {new Date().getFullYear()} DrillBit SoftTech India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
