export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', color: 'var(--text-main)', padding: '6rem 2rem 2rem' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
              <div style={{ background: 'var(--primary)', width: '20px', height: '20px', borderRadius: '4px' }}></div>
              <span>DrillBit</span>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '0.95rem' }}>
              Driving academic integrity through advanced AI and plagiarism detection technology.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">Institutional Portal</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">Research Checker</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">API Integration</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">About Us</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">Contact</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="hover-lift">Privacy Policy</a></li>
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
