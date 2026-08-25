import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      
      {/* Trust Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '3rem', fontWeight: 700 }}>
            Trusted by Excellence
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '4rem',
            opacity: 0.5,
          }}>
             {/* Mock Institution Logos */}
             <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>IIT DELHI</div>
             <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>JNU</div>
             <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>IIM BANGALORE</div>
             <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>BITS PILANI</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
