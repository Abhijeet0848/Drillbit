import Image from 'next/image';
import Link from 'next/link';
export default function Hero() {
  return (
    <section className="container" style={{ padding: '8rem 2rem', display: 'flex', alignItems: 'center', gap: '4rem' }}>
      <div style={{ flex: 1 }}>
        <div style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>✨ DrillBit 2.0 is Here</div>
        <h1 className="animate-fade" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
          India's Preferred <br/>Plagiarism & AI Detection
        </h1>
        <p className="animate-fade" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Ensure academic integrity and research excellence with our enterprise-grade detection suite. Trusted by 2000+ institutions worldwide.
        </p>
        <div className="animate-fade" style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/signup" className="btn btn-primary hover-lift" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', fontSize: '1rem' }}>Get Started</Link>
          <Link href="/dashboard" className="btn btn-outline hover-lift" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', fontSize: '1rem' }}>View Demo</Link>
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative' }} className="animate-fade">
        <div className="glass-panel" style={{ padding: '0.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: 'var(--bg-surface)' }}>
          <img 
            src="/images/hero.png" 
            alt="DrillBit Dashboard" 
            style={{ width: '100%', borderRadius: '6px', display: 'block', border: '1px solid var(--glass-border)' }}
          />
        </div>
      </div>
    </section>
  );
}
