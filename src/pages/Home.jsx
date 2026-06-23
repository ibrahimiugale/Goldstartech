import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Code, Cpu, Layers, ArrowRight, Award, CheckCircle, TrendingUp, Users, Play, Settings, RefreshCw, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReveal from '../utils/useReveal';
import liquidGold from '../assets/liquid_gold.png';
import goldStandardBadge from '../assets/gold_standard_badge.png';
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

      {/* ── TECH STACK MARQUEE SECTION ── */}
      <section className="tech-marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {/* n8n */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M9 12h6M15 12V5.5M15 12v6.5"/></svg>
              <span>n8n</span>
            </div>
            {/* zapier */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="#FF4A00"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              <span>zapier</span>
            </div>
            {/* make */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12a8 8 0 0 1 8-8c2.2 0 4.2.9 5.6 2.4M20 12a8 8 0 0 1-8 8c-2.2 0-4.2-.9-5.6-2.4"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
              <span>make</span>
            </div>
            {/* OpenAI */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 10.5C3.5 9 3.5 7 4.5 5.5s3-2 4.5-1.5M19.5 13.5c1 1.5 1 3.5 0 5s-3 2-4.5 1.5M19.5 10.5c1-1.5 1-3.5 0-5s-3-2-4.5-1.5M4.5 13.5c-1 1.5-1 3.5 0 5s3 2 4.5 1.5M12 3v18M3 12h18"/></svg>
              <span>OpenAI</span>
            </div>
            {/* Gemini */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z"/></svg>
              <span>Gemini</span>
            </div>
            {/* ElevenLabs */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18" rx="2"/><rect x="15" y="3" width="4" height="18" rx="2"/></svg>
              <span>ElevenLabs</span>
            </div>
            {/* Pinecone */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5 6h10zm0 5l-7 8h14zm0 6l-9 9h18z"/></svg>
              <span>Pinecone</span>
            </div>
            {/* PostgreSQL */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-10 10c0 4.13 2.5 7.69 6.06 9.22.47-.88.94-1.78 1.4-2.69-.96-.4-1.85-.98-2.65-1.71a8.03 8.03 0 0 1-1.81-8.31c.88-2.88 3.57-4.51 6.5-4.51s5.62 1.63 6.5 4.51a8.03 8.03 0 0 1-1.81 8.31c-.8.73-1.69 1.31-2.65 1.71.46.91.93 1.81 1.4 2.69A10.01 10.01 0 0 0 22 12 10 10 0 0 0 12 2z"/></svg>
              <span>PostgreSQL</span>
            </div>
            {/* node */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7.7v8.6L12 22l10-5.7V7.7L12 2z"/><path d="M12 22V12m0 0L2 7.7M12 12l10-4.3"/></svg>
              <span>node</span>
            </div>
            {/* python */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2.76 0-5 2.24-5 5v2h5v1H5c-1.66 0-3 1.34-3 3v5c0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3v-2h-5v-1h7c1.66 0 3-1.34 3-3v-5c0-2.76-2.24-5-5-5zm-2.5 3c.83 0 1.5.67 1.5 1.5S10.33 8 9.5 8 8 7.33 8 6.5 8.67 5 9.5 5zm5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              <span>python</span>
            </div>

            {/* Duplicate for infinite loop */}
            {/* n8n */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M9 12h6M15 12V5.5M15 12v6.5"/></svg>
              <span>n8n</span>
            </div>
            {/* zapier */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="#FF4A00"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
              <span>zapier</span>
            </div>
            {/* make */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 12a8 8 0 0 1 8-8c2.2 0 4.2.9 5.6 2.4M20 12a8 8 0 0 1-8 8c-2.2 0-4.2-.9-5.6-2.4"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
              <span>make</span>
            </div>
            {/* OpenAI */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 10.5C3.5 9 3.5 7 4.5 5.5s3-2 4.5-1.5M19.5 13.5c1 1.5 1 3.5 0 5s-3 2-4.5 1.5M19.5 10.5c1-1.5 1-3.5 0-5s-3-2-4.5-1.5M4.5 13.5c-1 1.5-1 3.5 0 5s3 2 4.5 1.5M12 3v18M3 12h18"/></svg>
              <span>OpenAI</span>
            </div>
            {/* Gemini */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z"/></svg>
              <span>Gemini</span>
            </div>
            {/* ElevenLabs */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18" rx="2"/><rect x="15" y="3" width="4" height="18" rx="2"/></svg>
              <span>ElevenLabs</span>
            </div>
            {/* Pinecone */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l-5 6h10zm0 5l-7 8h14zm0 6l-9 9h18z"/></svg>
              <span>Pinecone</span>
            </div>
            {/* PostgreSQL */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-10 10c0 4.13 2.5 7.69 6.06 9.22.47-.88.94-1.78 1.4-2.69-.96-.4-1.85-.98-2.65-1.71a8.03 8.03 0 0 1-1.81-8.31c.88-2.88 3.57-4.51 6.5-4.51s5.62 1.63 6.5 4.51a8.03 8.03 0 0 1-1.81 8.31c-.8.73-1.69 1.31-2.65 1.71.46.91.93 1.81 1.4 2.69A10.01 10.01 0 0 0 22 12 10 10 0 0 0 12 2z"/></svg>
              <span>PostgreSQL</span>
            </div>
            {/* node */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7.7v8.6L12 22l10-5.7V7.7L12 2z"/><path d="M12 22V12m0 0L2 7.7M12 12l10-4.3"/></svg>
              <span>node</span>
            </div>
            {/* python */}
            <div className="marquee-item">
              <svg className="tech-logo-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-2.76 0-5 2.24-5 5v2h5v1H5c-1.66 0-3 1.34-3 3v5c0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3v-2h-5v-1h7c1.66 0 3-1.34 3-3v-5c0-2.76-2.24-5-5-5zm-2.5 3c.83 0 1.5.67 1.5 1.5S10.33 8 9.5 8 8 7.33 8 6.5 8.67 5 9.5 5zm5 14c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              <span>python</span>
            </div>
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

      {/* ── TOOLS & INFRASTRUCTURE SECTION ── */}
      <section className="tools-infra-section">
        <div className="container tools-infra-container">
          <div className="tools-infra-left">
            <span className="section-badge">STACK & APIS</span>
            <h2>Tools & Infrastructure</h2>
            <div className="kyno-logo-container">
              <span className="kyno-logo">kyno<span className="logo-accent">AI</span></span>
            </div>
          </div>
          <div className="tools-infra-right">
            <div className="tools-list">
              <div className="tool-item">
                <span className="tool-name">n8n</span>
                <span className="tool-desc">Workflow automation platform</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Zapier</span>
                <span className="tool-desc">App integration tool</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Make</span>
                <span className="tool-desc">Visual automation builder</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">OpenAI API</span>
                <span className="tool-desc">Language model & reasoning</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Gemini API</span>
                <span className="tool-desc">Multimodal AI understanding</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">ElevenLabs</span>
                <span className="tool-desc">Voice synthesis & cloning</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">SIP Trunking</span>
                <span className="tool-desc">Real-time call routing</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Vector Databases - Pinecone</span>
                <span className="tool-desc">Semantic data search</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Custom AI Agents</span>
                <span className="tool-desc">Decision-making automation</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Speech-to-Text / TTS</span>
                <span className="tool-desc">Conversational AI interface</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">OCR + NLP Pipelines</span>
                <span className="tool-desc">Document data extraction</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Third-party APIs</span>
                <span className="tool-desc">Bookings, maps, CRMs</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">CRM / ERP Integrations</span>
                <span className="tool-desc">System data sync</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Serverless Infrastructure (AWS/Cloud Run)</span>
                <span className="tool-desc">Scalable AI execution</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Node.js / Python</span>
                <span className="tool-desc">Backend frameworks</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">Secure REST APIs</span>
                <span className="tool-desc">Data communication layer</span>
              </div>
              <div className="tool-item">
                <span className="tool-name">GDPR-Compliant Hosting</span>
                <span className="tool-desc">Data privacy & compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CASE STUDIES SECTION ── */}
      <section className="case-studies-section">
        <div className="container">
          <div className="section-header align-left">
            <span className="section-badge">CASE STUDIES</span>
            <h2>Proven Transformations</h2>
          </div>

          <div className="cases-list">
            {/* Case Study 1 */}
            <div className="case-card">
              <div className="case-top-tag">
                <span className="kyno-logo">kyno<span className="logo-accent">AI</span></span>
              </div>
              <div className="case-content-grid">
                <div className="case-text-col">
                  <span className="case-eyebrow">AI-Based Extraction & Categorization</span>
                  <h3>Smart Invoice Processing</h3>
                  <p className="case-summary">
                    Automates invoice data extraction and categorization for a European SMB's global supply chain.
                  </p>
                  
                  <div className="case-details-row">
                    <div className="detail-block">
                      <h5>Problem / Opportunity</h5>
                      <p>Manual processing took 2 full days, higher error rates, and delayed insights.</p>
                    </div>
                    <div className="detail-block">
                      <h5>Solution</h5>
                      <p>AI extracts and classifies line items (logistics, electricity, etc.) and identifies true product costs.</p>
                    </div>
                  </div>
                </div>

                <div className="case-table-col">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Before</th>
                        <th>After <span className="table-badge">AI-Based OCR</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="metric-name">Time</td>
                        <td className="before-val">2 days</td>
                        <td className="after-val highlighted-val">15 mins</td>
                      </tr>
                      <tr>
                        <td className="metric-name">Accuracy</td>
                        <td className="before-val">95-97%</td>
                        <td className="after-val highlighted-val">~99.5%</td>
                      </tr>
                      <tr>
                        <td className="metric-name">Effort</td>
                        <td className="before-val">Fully manual</td>
                        <td className="after-val highlighted-val">Fully automated</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="case-card">
              <div className="case-top-tag">
                <span className="kyno-logo">kyno<span className="logo-accent">AI</span></span>
              </div>
              <div className="case-content-grid">
                <div className="case-text-col">
                  <span className="case-eyebrow">AI Author</span>
                  <h3>Personalized Book Creation</h3>
                  <p className="case-summary">
                    Transforms personalized book creation - from 10 days to under 30 minutes - by automating writing, editing, formatting, and printing.
                  </p>
                  
                  <div className="case-details-row">
                    <div className="detail-block">
                      <h5>Problem / Opportunity</h5>
                      <p>Authors can spend their time refining the book instead of building it end-to-end.</p>
                    </div>
                    <div className="detail-block">
                      <h5>Solution</h5>
                      <p>AI Author handles end-to-end creation via customer input forms and automated pipelines with human in the loop.</p>
                    </div>
                  </div>
                </div>

                <div className="case-table-col">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Before</th>
                        <th>After <span className="table-badge">AI Author</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="metric-name">Time</td>
                        <td className="before-val">7-10 days</td>
                        <td className="after-val highlighted-val">&lt; 30 mins</td>
                      </tr>
                      <tr>
                        <td className="metric-name">Cost</td>
                        <td className="before-val">~£25+</td>
                        <td className="after-val highlighted-val">~£3</td>
                      </tr>
                      <tr>
                        <td className="metric-name">Workforce</td>
                        <td className="before-val">Human Authors</td>
                        <td className="after-val highlighted-val">AI Authors</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY GOLD STAR SPLIT SECTION ── */}
      <section className="section section-alt why-section">
        <div className="container why-container">
          {/* Left Visual block */}
          <div className="why-visual-block reveal">
            <img src={goldStandardBadge} alt="Gold Standard Emblem" className="why-visual-img" />
            <div className="why-visual-inner">
              <span className="why-badge">★ GOLD STANDARD</span>
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
