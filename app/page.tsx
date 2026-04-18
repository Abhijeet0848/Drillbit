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
      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'var(--bg-main)' }}>
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '3rem' }}>
            Trusted by Excellence
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '3rem',
            opacity: 0.6,
            filter: 'grayscale(100%)'
          }}>
             {/* Mock Institution Logos */}
             <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>IIT DELHI</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>JNU</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>IIM BANGALORE</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>BITS PILANI</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
