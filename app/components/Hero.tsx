import Image from 'next/image';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="container" style={{ padding: '8rem 2rem', display: 'flex', alignItems: 'center', gap: '4rem' }}>
      <div style={{ flex: 1 }}>
        <h1 className="animate-fade" style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>
          India's Preferred <span className="gradient-text">Plagiarism & AI</span> Detection
        </h1>
        <p className="animate-fade" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Ensure academic integrity and research excellence with our state-of-the-art AI-powered detection suite. Trusted by 2000+ institutions worldwide.
        </p>
        <div className="animate-fade" style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/signup" className="btn btn-primary" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>Get Started</Link>
          <Link href="/dashboard" className="btn btn-accent" style={{ padding: '1rem 2rem', textDecoration: 'none' }}>View Demo</Link>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative' }} className="animate-fade">
        <div className="glass" style={{ padding: '1rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(10, 37, 64, 0.15)' }}>
          <img 
            src="/images/hero.png" 
            alt="DrillBit Dashboard" 
            style={{ width: '100%', borderRadius: '8px', display: 'block' }}
          />
        </div>
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: '-20px', 
          right: '-20px', 
          width: '100px', 
          height: '100px', 
          background: 'var(--accent)', 
          filter: 'blur(60px)', 
          opacity: 0.5,
          zIndex: -1 
        }}></div>
      </div>
    </section>
  );
}
