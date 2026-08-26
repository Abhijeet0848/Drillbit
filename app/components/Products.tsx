import { Shield, Sparkles, Server, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function Products() {
  const products = [
    {
      title: "DrillBit Enterprise",
      tag: "Institutional Standard",
      desc: "Comprehensive plagiarism scanning powered by over 100B+ verified web pages, academic repositories, and private institutional archives.",
      icon: <Shield size={24} color="#3b82f6" />,
      features: [
        "100B+ web & journal database",
        "Encrypted institutional vault",
        "Granular similarity breakdown",
        "Multi-format document parsing"
      ],
      cta: "Explore Suite",
      href: "/signup",
      highlight: false
    },
    {
      title: "Neural AI Detector",
      tag: "Next-Gen AI Analysis",
      desc: "Advanced neural heuristics capable of distinguishing human writing from LLMs like GPT-4o, Claude 3.5 Sonnet, Gemini Pro, and DeepSeek.",
      icon: <Sparkles size={24} color="#3b82f6" />,
      features: [
        "Perplexity & Burstiness analysis",
        "Sentence-level probability heatmaps",
        "Paraphrase & rewrite detection",
        "Zero data retention mode"
      ],
      cta: "Try AI Detector",
      href: "/signup",
      highlight: true
    },
    {
      title: "LMS & API Suite",
      tag: "Developer & University",
      desc: "Seamlessly embed integrity checks into Moodle, Canvas, Blackboard, or custom institutional platforms with robust REST APIs and webhooks.",
      icon: <Server size={24} color="#3b82f6" />,
      features: [
        "LTI 1.3 certified integration",
        "High-throughput async scanning",
        "Automated grading workflows",
        "Custom webhook event dispatch"
      ],
      cta: "View Documentation",
      href: "#contact",
      highlight: false
    }
  ];

  return (
    <section id="products" style={{ padding: 'clamp(4rem, 8vh, 8rem) clamp(1rem, 4vw, 2rem) 4rem', background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vh, 4.5rem)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            background: 'var(--primary-light)',
            border: '1px solid var(--glass-border)',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Solutions Portfolio
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
            Engineered for Modern Integrity
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>
            Tailored software solutions for universities, publishers, and enterprise research teams.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)'
        }}>
          {products.map((p, i) => (
            <div 
              key={i} 
              className="glass-panel hover-lift" 
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                border: p.highlight ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid var(--glass-border)',
                background: p.highlight ? 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.08), var(--bg-card))' : 'var(--bg-card)',
                boxShadow: p.highlight ? '0 10px 30px -10px rgba(59, 130, 246, 0.15)' : 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)'
                  }}>
                    {p.icon}
                  </div>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    background: p.highlight ? 'rgba(59, 130, 246, 0.15)' : 'var(--primary-light)',
                    color: p.highlight ? '#3b82f6' : 'var(--text-muted)',
                    border: '1px solid var(--glass-border)'
                  }}>
                    {p.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {p.desc}
                </p>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Key Capabilities
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {p.features.map((feat, fi) => (
                      <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        <Check size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link 
                href={p.href} 
                className={p.highlight ? "btn btn-primary hover-lift" : "btn btn-outline hover-lift"}
                style={{ width: '100%', textDecoration: 'none', gap: '0.5rem', marginTop: '1rem' }}
              >
                <span>{p.cta}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
