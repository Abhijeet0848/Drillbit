'use client';

import { Mail, Phone, MapPin, Send, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" style={{ padding: 'clamp(4rem, 8vh, 6rem) clamp(1rem, 4vw, 2rem) clamp(4rem, 8vh, 8rem)', background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
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
            Get In Touch
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
            Connect with Our Team
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '600px', margin: '0 auto' }}>
            Request an institutional trial, schedule an interactive walkthrough, or get technical support.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)',
          alignItems: 'stretch'
        }}>
          {/* Contact Details Card */}
          <div className="glass-panel" style={{
            padding: 'clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'radial-gradient(ellipse at top left, rgba(59, 130, 246, 0.05), var(--bg-card))'
          }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                Institutional Sales & Support
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                Join over 2,000 universities and research centers worldwide utilizing DrillBit for integrity assurance.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)',
                    flexShrink: 0
                  }}>
                    <Mail size={18} color="#3b82f6" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Inquiries</div>
                    <a href="mailto:support@drillbitplagiarism.com" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none' }}>
                      support@drillbitplagiarism.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)',
                    flexShrink: 0
                  }}>
                    <Phone size={18} color="#3b82f6" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct Support Line</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      +91 (80) 4123-4567
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--glass-border)',
                    flexShrink: 0
                  }}>
                    <MapPin size={18} color="#3b82f6" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Headquarters</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      Bengaluru, Karnataka, India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '3rem',
              padding: '1.25rem',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <ShieldCheck size={20} color="#16a34a" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Guaranteed 24-hour response time for institutional inquiries.
              </span>
            </div>
          </div>

          {/* Interactive Form Card */}
          <div className="glass-panel" style={{
            padding: '3rem 2.5rem',
            borderRadius: '20px',
            border: '1px solid var(--glass-border)'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Send a Message
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Fill out the form below and our team will get in touch shortly.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Your message has been received.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="Prof. John Doe" 
                  required 
                  className="input-field" 
                  style={{ width: '100%', padding: '0.75rem 1rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Institutional Email
                </label>
                <input 
                  type="email" 
                  placeholder="johndoe@university.edu" 
                  required 
                  className="input-field" 
                  style={{ width: '100%', padding: '0.75rem 1rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Organization / University
                </label>
                <input 
                  type="text" 
                  placeholder="Delhi Technological University" 
                  className="input-field" 
                  style={{ width: '100%', padding: '0.75rem 1rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                  Inquiry Details
                </label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help your institution?" 
                  required 
                  className="input-field" 
                  style={{ width: '100%', padding: '0.75rem 1rem', resize: 'vertical' }} 
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary hover-lift" 
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', gap: '0.5rem', fontSize: '0.95rem' }}
              >
                <span>Submit Inquiry</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
