import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container" style={{ padding: '8rem 2rem 12rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div style={{ padding: '0.4rem 0.8rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '9999px', display: 'inline-block', marginBottom: '1.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>✨ DrillBit 2.0 is Here</div>
        <h1 className="animate-fade" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.04em' }}>
          India's Preferred <br/>Plagiarism & AI Detection
        </h1>
        <p className="animate-fade" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
          Ensure academic integrity and research excellence with our enterprise-grade detection suite. Trusted by 2000+ institutions worldwide.
        </p>
        <div className="animate-fade" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/signup" className="btn btn-primary hover-lift" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', fontSize: '1rem' }}>Get Started</Link>
          <Link href="/dashboard" className="btn btn-outline hover-lift" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', fontSize: '1rem' }}>View Demo</Link>
        </div>
      </div>
    </section>
  );
}
