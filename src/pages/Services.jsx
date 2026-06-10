import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Code, Cpu, Layers, CheckCircle, Search } from 'lucide-react';
import useReveal from '../utils/useReveal';
import './Services.css';

// Original service graphics
import serviceMarketingImg from '../assets/service_marketing.png';
import serviceSoftwareImg from '../assets/service_software.png';
import serviceAiAutomationImg from '../assets/service_ai_automation.png';
import serviceDesignImg from '../assets/service_design.png';
import serviceAiSearchImg from '../assets/service_ai_search.png';

export default function Services() {
  useReveal();

  const servicesData = [
    {
      id: 'digital-marketing',
      icon: <Megaphone size={20} color="var(--gold)" />,
      tag: 'Digital Marketing',
      image: serviceMarketingImg,
      title: 'Drive pipeline growth.',
      desc: 'We structure performance campaigns that turn visibility into measurable client revenue. By using advanced tracking systems, we capture and optimize customer acquisition costs.',
      bullets: [
        'Multi-channel campaign deployment.',
        'Data-backed customer conversion flows.',
        'Real-time marketing attribution tracking.',
        'Continuous audience split testing.'
      ]
    },
    {
      id: 'software-development',
      icon: <Code size={20} color="var(--gold)" />,
      tag: 'Software Development',
      image: serviceSoftwareImg,
      title: 'Build solid software.',
      desc: 'Our engineering team designs enterprise web applications, web backends, and databases. We write clean, tested React and Node.js source code built to scale infinitely.',
      bullets: [
        'Custom web application engineering.',
        'Tested backend architecture setups.',
        'Secure database engine structures.',
        'Automated code deployment processes.'
      ]
    },
    {
      id: 'ai-automation',
      icon: <Cpu size={20} color="var(--gold)" />,
      tag: 'AI Automation',
      image: serviceAiAutomationImg,
      title: 'Optimize operational speed.',
      desc: 'Deploy custom AI agents and automation scripts that streamline manual human workflows. We integrate state-of-the-art language models with your active business data.',
      bullets: [
        'Intelligent agent system integrations.',
        'No-code automated script workflows.',
        'Custom corporate data connections.',
        'Drastic task processing cost drops.'
      ]
    },
    {
      id: 'web-design',
      icon: <Layers size={20} color="var(--gold)" />,
      tag: 'Web Design',
      image: serviceDesignImg,
      title: 'Stun visual visitors.',
      desc: 'Craft premium interactive digital interfaces designed to express authority. We apply editorial layout systems, CSS glassmorphism, and responsive web aesthetics.',
      bullets: [
        'Curated brand design system mockups.',
        'Dynamic interactive visual prototypes.',
        'Responsive layout scaling tests.',
        'Optimized organic site conversions.'
      ]
    },
    {
      id: 'ai-search-aeo-geo',
      icon: <Search size={20} color="var(--gold)" />,
      tag: 'AI Search (AEO/GEO)',
      image: serviceAiSearchImg,
      title: 'Rank in AI search engines.',
      desc: 'Optimize your digital content schema and authority signals to rank in conversational results on ChatGPT, Gemini, and Perplexity.',
      bullets: [
        'Semantic JSON-LD structure auditing.',
        'robots.txt & LLM crawler optimization.',
        'Entity citation index building.',
        'Conversational search visibility tracking.'
      ]
    }
  ];

  return (
    <div className="services-page">
      {/* ── HERO SECTION ── */}
      <section className="services-hero">
        <div className="container">
          <span className="tag tag-gold reveal">OUR CAPABILITIES</span>
          <h1 className="reveal">What we build.</h1>
          <p className="services-subtext reveal">
            We deliver world-class software development, high-growth marketing, automated operations, and high-fidelity interface designs.
          </p>
        </div>
      </section>

      {/* ── SERVICES DETAILS ── */}
      <section className="services-list-section">
        <div className="container">
          <div className="services-details-list">
            {servicesData.map((s, idx) => (
              <div 
                key={s.id} 
                id={s.id} 
                className={`services-detail-item reveal ${idx % 2 === 1 ? 'reversed-layout' : ''}`}
              >
                {/* Visual Block (Left or Right depending on index) */}
                <div className="services-detail-visual">
                  <div className="services-visual-card">
                    <img src={s.image} alt={s.tag} className="services-visual-img" />
                    <div className="services-visual-accent"></div>
                    <div className="services-visual-number">0{idx + 1}</div>
                  </div>
                </div>

                {/* Text Details Block */}
                <div className="services-detail-info">
                  <div className="services-tag-row">
                    <span className="tag tag-icon-label">
                      {s.icon}
                      <span>{s.tag}</span>
                    </span>
                  </div>
                  <h2>{s.title}</h2>
                  <p className="services-detail-desc">{s.desc}</p>
                  <ul className="services-detail-bullets">
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <CheckCircle size={16} color="var(--gold)" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="services-detail-actions">
                    <Link to={`/services/${s.id}`} className="btn btn-primary btn-sm">Explore service</Link>
                    <Link to="/contact" className="btn btn-outline btn-sm">Get started</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="services-cta container">
        <div className="services-cta-band reveal">
          <h2>Ready to accelerate?</h2>
          <p>Schedule a project roadmap call with our principal engineers.</p>
          <Link to="/contact" className="btn btn-primary">Book Project Call</Link>
        </div>
      </section>
    </div>
  );
}
