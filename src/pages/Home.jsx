import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Code, Cpu, Layers, ArrowRight, Award, CheckCircle, TrendingUp, Users, Play, Settings, RefreshCw, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReveal from '../utils/useReveal';
import liquidGold from '../assets/liquid_gold.png';
import './Home.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useReveal();

  const [activeTab, setActiveTab] = useState('Marketing');
  const [roiBudget, setRoiBudget] = useState(15000);
  const [designMode, setDesignMode] = useState('polished');
  const [designTheme, setDesignTheme] = useState('gold');

  // Compiler simulation state
  const [compiling, setCompiling] = useState(false);
  const [compilerLogs, setCompilerLogs] = useState([]);

  // AI Pipeline simulation state
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineLog, setPipelineLog] = useState("Ready to process briefs.");

  const heroRef = useRef(null);
  const bgGlowRef = useRef(null);
  const canvasRef = useRef(null);

  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);
  const heroConsoleRef = useRef(null);

  const statsRef = useRef(null);
  const ctaBandRef = useRef(null);

  // Hero Entrance Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!heroBadgeRef.current || !heroTitleRef.current || !heroSubRef.current || !heroBtnRef.current || !heroConsoleRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    
    tl.fromTo(heroBadgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(heroTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.45')
      .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
      .fromTo(heroBtnRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
      .fromTo(heroConsoleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.45');
  }, []);

  // Smooth cursor-following ambient gold aura
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const hero = heroRef.current;
    const glow = bgGlowRef.current;
    if (!hero || !glow) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Smooth lag interpolation
      gsap.to(glow, {
        x: x - 180, // Offset half of glow size (360/2)
        y: y - 180,
        duration: 1.2,
        ease: 'power2.out'
      });
    };

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas Interactive Background Particle Effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = Math.min(65, Math.floor((width * height) / 14000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    let mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Push away from mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const opacity = ((90 - dist) / 90) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(201, 168, 76, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw connection lines to mouse
      if (mouse.x !== null && mouse.y !== null) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const opacity = ((160 - dist) / 160) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(201, 168, 76, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Stats Count-Up Scroll-Triggered Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (!statsRef.current) return;
    const statsElements = statsRef.current.querySelectorAll('.stat-number');
    if (statsElements.length === 0) return;
    
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

    if (!ctaBandRef.current) return;

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

  // ROI Calculator Calculations
  const calculatedGrowth = Math.floor(roiBudget * 3.6);
  const calculatedROI = Math.floor(((calculatedGrowth - roiBudget) / roiBudget) * 100);

  // Compile Handler
  const handleCompile = () => {
    if (compiling) return;
    setCompiling(true);
    setCompilerLogs([]);
    
    const logs = [
      "> vite build --mode production",
      "✨ [1/4] Loading configurations...",
      "📦 [2/4] Bundling React routes & GSAP timelines...",
      "⚡ [3/4] Running minification and asset compression...",
      "📄 [4/4] Writing chunks to dist/assets/index.js (395KB)",
      "✔ Compilation completed successfully in 740ms!"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setCompilerLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setCompiling(false);
        }
      }, (index + 1) * 300);
    });
  };

  // Pipeline flow handler
  const runPipeline = () => {
    if (pipelineStep > 0 && pipelineStep < 4) return;
    setPipelineStep(1);
    setPipelineLog("Lead brief received: 'Develop custom React WebApp'.");
    
    setTimeout(() => {
      setPipelineStep(2);
      setPipelineLog("AI parser processing requirements and selecting tech stack...");
    }, 1500);

    setTimeout(() => {
      setPipelineStep(3);
      setPipelineLog("Requirements extracted. Syncing to CRM and creating task board...");
    }, 3000);

    setTimeout(() => {
      setPipelineStep(4);
      setPipelineLog("✔ Pipeline complete. Lead processed & synced successfully!");
    }, 4500);
  };

  return (
    <div className="home-page">
      {/* ── HERO SECTION ── */}
      <section ref={heroRef} className="hero-section">
        {/* Ambient interactive background canvas & glow */}
        <div className="hero-bg-visual-wrapper">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hero-bg-video"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-glowing-dots-and-lines-network-41949-large.mp4" type="video/mp4" />
          </video>
          <canvas ref={canvasRef} className="hero-bg-canvas"></canvas>
          <div ref={bgGlowRef} className="hero-bg-glow-blob"></div>
        </div>

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

          {/* Interactive Capabilities Console */}
          <div ref={heroConsoleRef} className="hero-console-container">
            <div className="console-card">
              
              {/* Console header window tabs */}
              <div className="console-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="console-tabs">
                  {['Marketing', 'Software', 'AI Agents', 'Design'].map((tab) => (
                    <button
                      key={tab}
                      className={`console-tab-btn ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Console Body Content */}
              <div className="console-body">
                {activeTab === 'Marketing' && (
                  <div className="console-tab-content reveal-instant">
                    <div className="console-widget-header">
                      <span className="widget-label">GROWTH CALCULATOR</span>
                      <h4>Simulate marketing budget ROI</h4>
                    </div>
                    
                    <div className="roi-calculator">
                      <div className="calculator-row">
                        <span className="calc-label">Monthly Ad Spend</span>
                        <span className="calc-value">${roiBudget.toLocaleString()}</span>
                      </div>
                      
                      <input 
                        type="range" 
                        min="5000" 
                        max="100000" 
                        step="5000"
                        value={roiBudget}
                        onChange={(e) => setRoiBudget(Number(e.target.value))}
                        className="calculator-slider"
                      />

                      <div className="roi-bar-wrapper">
                        <div className="roi-bar-fill" style={{ width: `${Math.min(100, ((roiBudget - 5000) / 95000) * 100)}%` }}></div>
                      </div>

                      <div className="calculator-stats">
                        <div className="calc-stat-box">
                          <span className="stat-box-label">Projected Sales</span>
                          <span className="stat-box-value glow-text">${calculatedGrowth.toLocaleString()}</span>
                        </div>
                        <div className="calc-stat-box">
                          <span className="stat-box-label">Net Return</span>
                          <span className="stat-box-value gold-text">+{calculatedROI}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Software' && (
                  <div className="console-tab-content reveal-instant">
                    <div className="console-widget-header">
                      <span className="widget-label">CODE COMPILER</span>
                      <h4>Interactive Vite compile pipeline</h4>
                    </div>
                    
                    <div className="terminal-screen">
                      {compilerLogs.length === 0 ? (
                        <pre className="terminal-code">
                          <code>
<span className="code-keyword">const</span> <span className="code-name">GoldStarAgency</span> = &#123;<br/>
&nbsp;&nbsp;developers: <span className="code-str">"Senior In-House"</span>,<br/>
&nbsp;&nbsp;sprints: <span className="code-str">"Weekly Sprints"</span>,<br/>
&nbsp;&nbsp;stack: <span className="code-str">"Vite + React + Node"</span><br/>
&#125;;<br/><br/>
<span className="code-keyword">export default</span> <span className="code-name">GoldStarAgency</span>;
                          </code>
                        </pre>
                      ) : (
                        <div className="terminal-logs">
                          {compilerLogs.map((log, i) => (
                            <div key={i} className={`terminal-log-line ${log.startsWith('✔') ? 'success' : log.startsWith('>') ? 'cmd' : ''}`}>
                              {log}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="terminal-controls">
                        <button 
                          className="btn-compile-run"
                          onClick={handleCompile}
                          disabled={compiling}
                        >
                          {compiling ? 'Compiling...' : 'Run Compiler'}
                        </button>
                        
                        <div className="terminal-status">
                          <span className={`status-dot ${compiling ? 'yellow-pulse' : compilerLogs.length > 0 ? 'green-pulse' : 'idle-dot'}`}></span>
                          <span className="status-text">
                            {compiling ? 'Running Vite bundler...' : compilerLogs.length > 0 ? 'Production build ready' : 'Idle'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'AI Agents' && (
                  <div className="console-tab-content reveal-instant">
                    <div className="console-widget-header">
                      <span className="widget-label">AGENT PIPELINE</span>
                      <h4>Lead Processing Automation Flow</h4>
                    </div>
                    
                    <div className="pipeline-visual">
                      <div className={`pipeline-node ${pipelineStep >= 1 ? 'active' : ''}`}>
                        <div className="node-icon">📥</div>
                        <span>Brief</span>
                      </div>
                      
                      <div className="pipeline-connector">
                        <svg className="connector-svg" viewBox="0 0 100 20">
                          <line x1="0" y1="10" x2="100" y2="10" className="connector-line-bg" />
                          {pipelineStep === 1 && (
                            <circle cx="0" cy="10" r="4" className="connector-packet">
                              <animate attributeName="cx" values="0;100" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          )}
                        </svg>
                      </div>
                      
                      <div className={`pipeline-node ${pipelineStep >= 2 ? 'active' : ''}`}>
                        <div className={`node-icon ${pipelineStep === 2 ? 'pulse-ai' : ''}`}>🤖</div>
                        <span>AI Parser</span>
                      </div>
                      
                      <div className="pipeline-connector">
                        <svg className="connector-svg" viewBox="0 0 100 20">
                          <line x1="0" y1="10" x2="100" y2="10" className="connector-line-bg" />
                          {pipelineStep === 2 && (
                            <circle cx="0" cy="10" r="4" className="connector-packet">
                              <animate attributeName="cx" values="0;100" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                          )}
                        </svg>
                      </div>
                      
                      <div className={`pipeline-node ${pipelineStep >= 3 ? 'active' : ''}`}>
                        <div className="node-icon">📊</div>
                        <span>CRM Sync</span>
                      </div>
                    </div>

                    <div className="pipeline-footer">
                      <button 
                        className="btn-pipeline-run"
                        onClick={runPipeline}
                        disabled={pipelineStep > 0 && pipelineStep < 4}
                      >
                        {pipelineStep > 0 && pipelineStep < 4 ? 'Processing...' : 'Execute Agent Workflow'}
                      </button>
                      <p className="pipeline-log-text">{pipelineLog}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'Design' && (
                  <div className="console-tab-content reveal-instant">
                    <div className="console-widget-header">
                      <span className="widget-label">DESIGN SYSTEM</span>
                      <h4>Configure layout & color accents</h4>
                    </div>
                    
                    <div className="design-toggle-box">
                      <div className="design-controls-row">
                        <div className="design-buttons">
                          <button 
                            className={`design-btn ${designMode === 'wireframe' ? 'active' : ''}`}
                            onClick={() => setDesignMode('wireframe')}
                          >
                            Wireframe
                          </button>
                          <button 
                            className={`design-btn ${designMode === 'polished' ? 'active' : ''}`}
                            onClick={() => setDesignMode('polished')}
                          >
                            Polished UX
                          </button>
                        </div>
                        
                        <div className="theme-selectors">
                          {['gold', 'platinum', 'champagne'].map((theme) => (
                            <button
                              key={theme}
                              className={`theme-dot ${theme} ${designTheme === theme ? 'active' : ''}`}
                              onClick={() => setDesignTheme(theme)}
                              title={`${theme} theme`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className={`design-preview-pane ${designMode} theme-${designTheme}`}>
                        {designMode === 'wireframe' ? (
                          <div className="wireframe-mock">
                            <div className="mock-title-dashed"></div>
                            <div className="mock-bar-dashed"></div>
                            <div className="mock-circles-dashed">
                              <span className="circle-dashed"></span>
                              <span className="circle-dashed"></span>
                            </div>
                          </div>
                        ) : (
                          <div className="polished-mock">
                            <div className="mock-title-gradient"></div>
                            <div className="mock-bar-gold"></div>
                            <div className="mock-circles">
                              <span className="circle-gradient"></span>
                              <span className="circle-gradient"></span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
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
              <Link to="/services/digital-marketing" className="service-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="service-card stagger-item">
              <div className="service-icon-wrapper">
                <Code size={24} color="var(--gold)" />
              </div>
              <h3>Software Development</h3>
              <p>Robust enterprise web applications, web backends, and databases.</p>
              <Link to="/services/software-development" className="service-link">
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
              <Link to="/services/ai-automation" className="service-link">
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
              <Link to="/services/web-design" className="service-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 5 */}
            <div className="service-card stagger-item">
              <div className="service-icon-wrapper">
                <Search size={24} color="var(--gold)" />
              </div>
              <h3>AI Search (AEO/GEO)</h3>
              <p>Optimize web architecture and citations to rank in ChatGPT and Perplexity.</p>
              <Link to="/services/ai-search-aeo-geo" className="service-link">
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
