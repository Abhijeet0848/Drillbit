import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import MagicRings from './components/MagicRings';

export default function Home() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, pointerEvents: 'none', background: 'var(--bg-main)' }}>
        <MagicRings 
          color="#3b82f6" 
          colorTwo="#8b5cf6" 
          opacity={0.3} 
          speed={0.5} 
          baseRadius={0.4} 
        />
      </div>
      
      <Navbar />
      <Hero />
      <Features />
      
      {/* Trust Section */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'transparent', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
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
