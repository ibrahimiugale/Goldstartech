import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Code, Cpu, Layers, ArrowRight, Award, CheckCircle, TrendingUp, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReveal from '../utils/useReveal';
import './Home.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useReveal();

  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);
  const heroVisualRef = useRef(null);
  
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);

  const statsRef = useRef(null);
  const ctaBandRef = useRef(null);

  // Hero Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.45')
      .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .fromTo(heroBtnRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
      .fromTo(heroVisualRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.55');

    // Continuous Orbit Ring Rotations (different speeds & directions)
    gsap.to(ring1Ref.current, { rotation: 360, duration: 25, repeat: -1, ease: 'none' });
    gsap.to(ring2Ref.current, { rotation: -360, duration: 35, repeat: -1, ease: 'none' });
    gsap.to(ring3Ref.current, { rotation: 360, duration: 45, repeat: -1, ease: 'none' });

  }, []);

  // Stats Count-Up Scroll-Triggered Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const statsElements = statsRef.current.querySelectorAll('.stat-number');
    
    statsElements.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const obj = { val: 0 };

      gsap.fromTo(obj, 
        { val: 0 },
        {
          val: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.val) + suffix;
          }
        }
      );
    });
  }, []);

  // Scale-in CTA Band Scroll Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(ctaBandRef.current,
      { scale: 0.94, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaBandRef.current,
          start: 'top 88%',
          once: true
        }
      }
    );
  }, []);

  return (
    <div className="home-page">
      {/* ── HERO SECTION ── */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-info">
            <div ref={heroBadgeRef} className="hero-badge-container">
              <span className="tag tag-gold">⭐ Premier Digital Agency</span>
            </div>
            <h1 ref={heroTitleRef} className="hero-headline">
              We design digital <br/>
              solutions that <span className="gold-highlight">perform</span>.
            </h1>
            <p ref={heroSubRef} className="hero-subtext">
              High-growth digital marketing, custom software development, AI automation, and premium web design.
            </p>
            <div ref={heroBtnRef} className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Start a Project</Link>
              <Link to="/services" className="btn btn-outline">Our Services</Link>
            </div>
          </div>

          {/* GSAP Orbit Visual */}
          <div ref={heroVisualRef} className="hero-visual">
            <div className="orbit-wrapper">
              <div ref={ring1Ref} className="orbit-ring ring-1">
                <div className="orbit-dot dot-1" title="Marketing"><Megaphone size={16} color="var(--ink)" /></div>
                <div className="orbit-dot dot-2" title="Development"><Code size={16} color="var(--ink)" /></div>
              </div>
              <div ref={ring2Ref} className="orbit-ring ring-2">
                <div className="orbit-dot dot-3" title="AI"><Cpu size={16} color="var(--ink)" /></div>
                <div className="orbit-dot dot-4" title="Design"><Layers size={16} color="var(--ink)" /></div>
              </div>
              <div ref={ring3Ref} className="orbit-ring ring-3"></div>
              <div className="orbit-core">
                <span className="core-star">★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT MARQUEE SECTION ── */}
      <section className="marquee-section">
        <p className="marquee-eyebrow">TRUSTED BY FORWARD-THINKING BRANDS</p>
        <div className="marquee-container">
          <div className="marquee-track">
            <span>Iugale Systems</span>
            <span>Aura Tech</span>
            <span>Nova Analytics</span>
            <span>Pulse Digital</span>
            <span>Sphere Software</span>
            <span>Vertex AI</span>
            <span>Quantum Labs</span>
            {/* Duplicate for infinite loop */}
            <span>Iugale Systems</span>
            <span>Aura Tech</span>
            <span>Nova Analytics</span>
            <span>Pulse Digital</span>
            <span>Sphere Software</span>
            <span>Vertex AI</span>
            <span>Quantum Labs</span>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section ref={statsRef} className="stats-section section-alt">
        <div className="container stats-container stagger-group">
          <div className="stat-item stagger-item">
            <span className="stat-number" data-target="150" data-suffix="+">0+</span>
            <p className="stat-label">Clients Served</p>
          </div>
          <div className="stat-item stagger-item">
            <span className="stat-number" data-target="98" data-suffix="%">0%</span>
            <p className="stat-label">Client Retention</p>
          </div>
          <div className="stat-item stagger-item">
            <span className="stat-number" data-target="6" data-suffix="x">0x</span>
            <p className="stat-label">Average ROI Increase</p>
          </div>
          <div className="stat-item stagger-item">
            <span className="stat-number" data-target="10" data-suffix="+">0+</span>
            <p className="stat-label">Years Experience</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW GRID ── */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-badge">WHAT WE DO</span>
            <h2>Premium Solutions</h2>
            <p>We blend design and engineering to build scalable products that drive compound growth.</p>
          </div>

          <div className="services-grid stagger-group">
            {/* Card 1 */}
            <div className="service-card stagger-item">
              <div className="service-icon-wrapper">
                <Megaphone size={24} color="var(--gold)" />
              </div>
              <h3>Digital Marketing</h3>
              <p>Data-driven performance campaigns that acquire and retain users at scale.</p>
              <Link to="/services#digital-marketing" className="service-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="service-card stagger-item">
              <div className="service-icon-wrapper">
                <Code size={24} color="var(--gold)" />
              </div>
              <h3>Software Development</h3>
              <p>Robust enterprise web applications, mobile apps, and custom platforms.</p>
              <Link to="/services#software-dev" className="service-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="service-card stagger-item">
              <div className="service-icon-wrapper">
                <Cpu size={24} color="var(--gold)" />
              </div>
              <h3>AI Automation</h3>
              <p>Intelligent agent workflows and integrations that optimize operation costs.</p>
              <Link to="/services#ai-automation" className="service-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 4 */}
            <div className="service-card stagger-item">
              <div className="service-icon-wrapper">
                <Layers size={24} color="var(--gold)" />
              </div>
              <h3>Web Design</h3>
              <p>Highly aesthetic interactive websites crafted to capture conversion leads.</p>
              <Link to="/services#web-design" className="service-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY GOLD STAR SPLIT SECTION ── */}
      <section className="section section-alt why-section">
        <div className="container why-container">
          {/* Left Visual block */}
          <div className="why-visual-block reveal">
            <div className="why-visual-inner">
              <span className="why-badge">★ GOLD STANDARD</span>
              <div className="geometric-pattern">
                <div className="geo-circle"></div>
                <div className="geo-square"></div>
              </div>
            </div>
          </div>

          {/* Right Text details */}
          <div className="why-details reveal">
            <span className="section-badge">WHY CHOOSE US</span>
            <h2 className="why-headline">We build for business outcomes.</h2>
            <ul className="why-bullets">
              <li>
                <CheckCircle size={18} color="var(--gold)" />
                <span>Confidential, dedicated in-house developers.</span>
              </li>
              <li>
                <Award size={18} color="var(--gold)" />
                <span>Curated startup-grade premium aesthetics.</span>
              </li>
              <li>
                <TrendingUp size={18} color="var(--gold)" />
                <span>Stellar transparency, no management bloat.</span>
              </li>
              <li>
                <Users size={18} color="var(--gold)" />
                <span>Weekly sprints, rapid product deployment.</span>
              </li>
            </ul>
            <Link to="/about" className="btn btn-outline">About Our Agency</Link>
          </div>
        </div>
      </section>

      {/* ── CTA GRADIENT BAND ── */}
      <section className="cta-band-section container">
        <div ref={ctaBandRef} className="cta-band">
          <h2 className="cta-band-title">Let's create something stellar.</h2>
          <Link to="/contact" className="btn btn-primary">Book a Call</Link>
        </div>
      </section>
    </div>
  );
}
