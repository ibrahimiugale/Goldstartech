import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Eye, Shield, Target } from 'lucide-react';
import useReveal from '../utils/useReveal';
import startupStoryVisual from '../assets/startup_story_visual.png';
import './About.css';

export default function About() {
  useReveal();

  const values = [
    {
      icon: <Zap size={24} color="var(--gold)" />,
      title: 'Speed',
      desc: 'We launch functional products in weeks, not quarters. Momentum is our strategy.'
    },
    {
      icon: <Eye size={24} color="var(--gold)" />,
      title: 'Transparency',
      desc: 'Direct channels. Shared Slack. Open pipelines. You see what we see.'
    },
    {
      icon: <Target size={24} color="var(--gold)" />,
      title: 'Results',
      desc: 'We map every line of code and campaign directly to revenue indicators.'
    },
    {
      icon: <Shield size={24} color="var(--gold)" />,
      title: 'Innovation',
      desc: 'Active execution of AI agent workflows that drive structural advantages.'
    }
  ];

  const team = [
    { name: 'Ibrahim Ugale', role: 'Founder & CEO', initials: 'IU' },
    { name: 'Daniyal Ahmed', role: 'Lead Developer', initials: 'DA' },
    { name: 'Sarah Jenkins', role: 'Head of Growth', initials: 'SJ' },
    { name: 'Michael Chen', role: 'AI Architect', initials: 'MC' },
    { name: 'Elena Rostova', role: 'Creative Director', initials: 'ER' }
  ];

  return (
    <div className="about-page">
      {/* ── HERO SECTION ── */}
      <section className="about-hero">
        <div className="container">
          <span className="tag tag-gold reveal">OUR MISSION</span>
          <h1 className="reveal">We're Gold Star.</h1>
          <p className="about-mission reveal">
            We partner with high-growth startups and enterprises to build premium software, automate complex operations, and drive market-leading digital marketing outcomes.
          </p>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="section section-alt story-section">
        <div className="container story-container reveal">
          <div className="story-left">
            <span className="section-badge">OUR STORY</span>
            <h2>How we started.</h2>
            <p>
              Gold Star was founded to eliminate the friction between corporate agencies and fast-moving tech startups. We realized that traditional consultancy models introduce too much bloat, management overhead, and slow decision cycles.
            </p>
          </div>
          <div className="story-right">
            <p>
              We assembled a lean, world-class team of developers, automation experts, and growth marketers to ship products at warp speed. By applying the 80/20 rule, we focus only on elements that deliver maximum visual and performance impact.
            </p>
            <div className="story-shape-visual">
              <img src={startupStoryVisual} alt="Startup team visual" className="story-visual-img" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION ── */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">CORE VALUES</span>
            <h2>What drives us.</h2>
            <p>We work under a strict set of operating principles to guarantee consistency and engineering excellence.</p>
          </div>

          <div className="values-grid stagger-group">
            {values.map((v, idx) => (
              <div key={idx} className="value-card stagger-item">
                <div className="value-icon-wrapper">
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ── */}
      <section className="section section-alt team-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">THE TEAM</span>
            <h2>Meet the experts.</h2>
            <p>A highly collaborative team of senior engineers and strategic designers.</p>
          </div>

          <div className="team-grid stagger-group">
            {team.map((t, idx) => (
              <div key={idx} className="team-card stagger-item">
                <div className="team-avatar">
                  <span>{t.initials}</span>
                </div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK WITH US CTA ── */}
      <section className="about-cta container">
        <div className="work-cta-band reveal">
          <h2>Ready to build something stellar?</h2>
          <p>Let's map out your software, AI automation, or marketing roadmap today.</p>
          <Link to="/contact" className="btn btn-primary">Work With Us</Link>
        </div>
      </section>
    </div>
  );
}
