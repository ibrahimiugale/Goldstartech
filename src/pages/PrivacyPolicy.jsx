import React from 'react';
import useReveal from '../utils/useReveal';

export default function PrivacyPolicy() {
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
        <h1 className="reveal" style={headerStyle}>Privacy Policy</h1>
        <p className="reveal" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Last Updated: June 10, 2026</p>
      </header>

      <main className="reveal">
        <section style={sectionStyle}>
          <p>
            At Gold Star, we respect your privacy. This policy outlines how we collect, handle, and store user data during your interactions with our website and application platforms.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Data Collection</h2>
          <p>
            We collect information that you actively submit to us via our contact forms, brief uploads, or email links. This data is limited to:
          </p>
          <ul style={bulletListStyle}>
            <li>Full name and corporate identity details.</li>
            <li>Direct contact email and phone numbers.</li>
            <li>Project brief parameters and budgets.</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. How We Use It</h2>
          <p>
            We use your data solely to respond to project inquiries, build customized service roadmaps, and manage client communications. We never sell or rent user details.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Cookies</h2>
          <p>
            We deploy basic analytical cookies to evaluate web traffic structures and speed metrics. You can disable cookies directly inside your browser options.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Third Parties</h2>
          <p>
            We share client data only with verified third-party utilities that process email notifications or store dashboard datasets. All processors adhere to strict privacy safeguards.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Your Rights</h2>
          <p>
            You have the right to request a complete copy of the data we hold on you, or request its immediate erasure from our storage engines. Contact our office to initiate this request.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Contact</h2>
          <p>
            For privacy inquiries, please contact our legal counsel at <a href="mailto:legal@goldstar.agency" style={{ color: 'var(--gold)', fontWeight: '600' }}>legal@goldstar.agency</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
