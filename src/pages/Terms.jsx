import React from 'react';
import useReveal from '../utils/useReveal';

export default function Terms() {
  useReveal();

  const proseStyle = {
    padding: 'calc(var(--nav-h) + 60px) 24px 100px 24px',
    maxWidth: '720px',
    margin: '0 auto',
    color: 'var(--soft)',
    fontFamily: 'var(--font-body)',
    lineHeight: '1.75'
  };

  const headerStyle = {
    color: 'var(--ink)',
    marginBottom: '12px'
  };

  const sectionStyle = {
    margin: '40px 0'
  };

  const h2Style = {
    color: 'var(--ink)',
    fontFamily: 'var(--font-display)',
    fontSize: '1.65rem',
    fontWeight: '700',
    marginBottom: '20px',
    marginTop: '36px',
    letterSpacing: '-0.5px'
  };

  const bulletListStyle = {
    paddingLeft: '24px',
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  return (
    <div style={proseStyle}>
      <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '32px' }}>
        <span className="tag tag-gold reveal" style={{ marginBottom: '16px' }}>LEGAL POLICY</span>
        <h1 className="reveal" style={headerStyle}>Terms & Conditions</h1>
        <p className="reveal" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Last Updated: June 10, 2026</p>
      </header>

      <main className="reveal">
        <section style={sectionStyle}>
          <p>
            Please read these Terms & Conditions carefully before using our digital agency services. By engaging with Gold Star, you agree to follow these rules.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance</h2>
          <p>
            By accessing this website, submitting project briefs, or signing project contracts, you accept these terms in full. If you disagree, please stop using our services immediately.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Services</h2>
          <p>
            We offer digital marketing campaigns, software engineering, AI workflow automations, and custom interface designs. The exact scope and timeline are defined in separate project scopes.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Payment</h2>
          <p>
            All custom design and software developments require a deposit before kickoff. Recurring SaaS marketing and hosting retainers are billed monthly on the first day.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Intellectual Property</h2>
          <p>
            Upon receipt of final payment, ownership of custom code, graphics, and campaigns shifts entirely to the client. Proprietary software plugins remain the property of Gold Star.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Limitation of Liability</h2>
          <p>
            Gold Star is not liable for direct, indirect, or consequential damages resulting from product launches, server downtimes, or marketing spend outcomes.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of California. Any legal disputes will be resolved exclusively in the state and federal courts located in San Francisco.
          </p>
        </section>
      </main>
    </div>
  );
}
