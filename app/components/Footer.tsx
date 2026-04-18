export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'white', padding: '4rem 2rem 2rem' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              Drill<span style={{ color: 'var(--accent)' }}>Bit</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
              Driving academic integrity through advanced AI and plagiarism detection technology.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Institutional Portal</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Research Checker</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>API Integration</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Contact</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '2rem', 
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.9rem'
        }}>
          &copy; {new Date().getFullYear()} DrillBit SoftTech India. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
