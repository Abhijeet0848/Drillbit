import Image from 'next/image';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="container" style={{ padding: '8rem 2rem', display: 'flex', alignItems: 'center', gap: '4rem' }}>
      <div style={{ flex: 1 }}>
        <div style={{ padding: '0.5rem 1rem', background: 'hsla(var(--primary-h), var(--primary-s), 50%, 0.1)', border: '1px solid hsla(var(--primary-h), var(--primary-s), 50%, 0.2)', borderRadius: '20px', display: 'inline-block', marginBottom: '1.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>✨ DrillBit 2.0 is Here</div>
        <h1 className="animate-fade" style={{ fontSize: '5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: 800 }}>
          India's Preferred <br/><span className="gradient-text">Plagiarism & AI</span> Detection
        </h1>
        <p className="animate-fade" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Ensure academic integrity and research excellence with our state-of-the-art AI-powered detection suite. Trusted by 2000+ institutions worldwide.
        </p>
        <div className="animate-fade" style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/signup" className="btn btn-primary hover-lift glow-active" style={{ padding: '1rem 2rem', textDecoration: 'none', fontSize: '1.1rem' }}>Get Started</Link>
          <Link href="/dashboard" className="btn btn-outline hover-lift" style={{ padding: '1rem 2rem', textDecoration: 'none', fontSize: '1.1rem' }}>View Demo</Link>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative' }} className="animate-fade">
        <div className="glass-panel" style={{ padding: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <img 
            src="/images/hero.png" 
            alt="DrillBit Dashboard" 
            style={{ width: '100%', borderRadius: '12px', display: 'block', border: '1px solid var(--glass-border)' }}
          />
        </div>
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: '-20px', 
          right: '-20px', 
          width: '150px', 
          height: '150px', 
          background: 'var(--primary)', 
          filter: 'blur(80px)', 
          opacity: 0.6,
          zIndex: -1 
        }}></div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-20px', 
          left: '-20px', 
          width: '150px', 
          height: '150px', 
          background: 'var(--accent)', 
          filter: 'blur(80px)', 
          opacity: 0.4,
          zIndex: -1 
        }}></div>
      </div>
    </section>
  );
}
