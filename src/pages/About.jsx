import React from 'react';
import { Link } from 'react-router-dom';
import { GitMerge, Mic, Database, Brain, GitFork } from 'lucide-react';
import useReveal from '../utils/useReveal';
import startupStoryVisual from '../assets/startup_story_visual.png';
import './About.css';

export default function About() {
  useReveal();

  const capabilities = [
    {
      icon: <GitMerge size={28} color="#ff453a" />,
      title: 'End-to-end',
      subtitle: 'AI Automation'
    },
    {
      icon: <Mic size={28} color="#ff453a" />,
      title: 'Voice AI and',
      subtitle: 'Conversational AI'
    },
    {
      icon: <Database size={28} color="#ff453a" />,
      title: 'Business Intelligence',
      subtitle: 'and Data Extraction'
    },
    {
      icon: <Brain size={28} color="#ff453a" />,
      title: 'Personalized Learning',
      subtitle: 'and Content Generation'
    },
    {
      icon: <GitFork size={28} color="#ff453a" />,
      title: 'AI-driven',
      subtitle: 'decision systems'
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
      {/* ── HERO & CAPABILITIES SECTION (DARK BLOCK) ── */}
      <section className="about-hero-dark">
        <div className="container about-hero-container">
          <div className="about-header-top">
            <div className="kyno-logo-top">
              <span className="kyno-logo">kyno<span className="logo-accent">AI</span></span>
            </div>
            <h1>About Us</h1>
            <p className="about-desc-large">
              We build intelligent automation systems that complement existing processes, increasing efficiency while giving teams more time to upskill and take on more meaningful responsibilities.
            </p>
          </div>

          <div className="about-mission-block">
            <p className="mission-highlight">
              Our Mission is to make Artificial Intelligence <strong className="bold-white">Practical, Measurable, and Transformative</strong> for every business.
            </p>
          </div>

          <div className="capabilities-row stagger-group">
            {capabilities.map((c, idx) => (
              <div key={idx} className="capability-item stagger-item">
                <div className="capability-circle-wrapper">
                  <div className="capability-circle">
                    {c.icon}
                  </div>
                </div>
                <div className="capability-label">
                  <span>{c.title}</span>
                  <span>{c.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
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
