import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ArrowLeft, Cpu, Settings, Layers, Code, Search } from 'lucide-react';
import useReveal from '../utils/useReveal';
import './Contact.css';

export default function Contact() {
  useReveal();

  // Tab State: 'standard' or 'ai-builder'
  const [activeTab, setActiveTab] = useState('standard');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState('standard');

  // Standard Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // AI Proposal Architect States
  const [aiStep, setAiStep] = useState(1);
  const [aiName, setAiName] = useState('');
  const [aiEmail, setAiEmail] = useState('');
  const [budgetVal, setBudgetVal] = useState(45000);
  const [timelineVal, setTimelineVal] = useState('8-weeks');
  const [complexityVal, setComplexityVal] = useState('custom');
  const [selectedFeatures, setSelectedFeatures] = useState(['frontend', 'backend']);
  const [aiErrors, setAiErrors] = useState({});
  const [isScoping, setIsScoping] = useState(false);
  const [scopingLogs, setScopingLogs] = useState([]);
  const [scopingOutput, setScopingOutput] = useState({
    estimatedCost: 0,
    sprints: 0,
    timelineWeeks: 0,
    techStack: [],
    sprintBreakdown: [],
    budgetConstrained: false
  });

  // Standard Form Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.service) newErrors.service = 'Please select a service.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedType('standard');
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
    }
  };

  // AI Form Step 1 Validation
  const handleAiStep1Next = () => {
    const newErrors = {};
    if (!aiName.trim()) newErrors.name = 'Name is required.';
    if (!aiEmail.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(aiEmail)) {
      newErrors.email = 'Invalid email address.';
    }
    setAiErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setAiStep(2);
    }
  };

  // AI Form Scoping Execution
  const buildSprintBreakdown = (features) => {
    const breakdown = [];
    if (features.includes('design')) {
      breakdown.push('Branding, wireframing, and interactive UI/UX prototyping.');
    }
    if (features.includes('frontend')) {
      breakdown.push('Vite React component building, routing setup, and GSAP integrations.');
    }
    if (features.includes('backend')) {
      breakdown.push('Node Express REST/GraphQL server creation and security headers config.');
    }
    if (features.includes('database')) {
      breakdown.push('PostgreSQL/NoSQL database schemas and user credential auth pipeline.');
    }
    if (features.includes('ai-integration')) {
      breakdown.push('OpenAI/Gemini prompt parser scripts and automated workflow agents.');
    }
    breakdown.push('Staging environment integration, security QA auditing, and live deploy.');
    return breakdown;
  };

  const handleStartScoping = () => {
    setAiStep(3);
    setIsScoping(true);
    setScopingLogs([]);

    const sprintBreakdown = buildSprintBreakdown(selectedFeatures);
    const sprintCount = sprintBreakdown.length;
    const sprintWeeks = timelineVal === '4-weeks' ? sprintCount : sprintCount * 2;
    
    // Compute dynamic cost based on options
    let cost = (12000 + selectedFeatures.length * 8000) * 
               (complexityVal === 'mvp' ? 0.75 : complexityVal === 'custom' ? 1.15 : 1.7);
    if (timelineVal === '4-weeks') cost += 5000; // rush fee
    cost = Math.round(cost / 500) * 500;
    
    let budgetConstrained = cost > budgetVal;
    if (budgetConstrained) {
      // Scale down to budget if exceeded
      cost = Math.round((budgetVal * 0.94) / 500) * 500;
    }

    const techStack = ['Vite', 'React 19', 'GSAP'];
    if (selectedFeatures.includes('backend')) techStack.push('Node.js', 'Express');
    if (selectedFeatures.includes('database')) techStack.push('PostgreSQL', 'Prisma');
    if (selectedFeatures.includes('ai-integration')) techStack.push('OpenAI API', 'LangChain');
    if (selectedFeatures.includes('design')) techStack.push('Figma UI/UX');

    const steps = [
      "🤖 Spawning scoping architect and initializing analysis container...",
      "⚙️ Parsing system integrations: " + selectedFeatures.join(', ').toUpperCase() + "...",
      "⏳ Checking budget parameters... Limit set to $" + budgetVal.toLocaleString() + "...",
      "⚡ Running allocation simulator: " + (budgetConstrained ? "RE-SHAPING MODULES (over budget boundaries)" : "Resources verified"),
      "📅 Sprint allocations calculated: " + sprintCount + " sprints on a " + (timelineVal === '4-weeks' ? 'compressed' : 'standard') + " schedule...",
      "✔ Compiling Dynamic Blueprint Estimate & Project Roadmap...",
      "✨ Proposal blueprint generated!"
    ];

    steps.forEach((stepStr, idx) => {
      setTimeout(() => {
        setScopingLogs((prev) => [...prev, stepStr]);
        if (idx === steps.length - 1) {
          setScopingOutput({
            estimatedCost: cost,
            sprints: sprintCount,
            timelineWeeks: sprintWeeks,
            techStack,
            sprintBreakdown,
            budgetConstrained
          });
          setIsScoping(false);
        }
      }, (idx + 1) * 600);
    });
  };

  const handleApproveScope = () => {
    setSubmittedType('ai-builder');
    setIsSubmitted(true);
    // Reset AI Proposal wizard
    setAiStep(1);
    setAiName('');
    setAiEmail('');
    setBudgetVal(45000);
    setTimelineVal('8-weeks');
    setComplexityVal('custom');
    setSelectedFeatures(['frontend', 'backend']);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* ── HERO SECTION ── */}
      <section className="contact-hero">
        <div className="container">
          <span className="tag tag-gold reveal">GET IN TOUCH</span>
          <h1 className="reveal">Let's build something.</h1>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="section contact-section">
        <div className="container contact-container reveal">
          
          {/* Left Column: Info & Bullets */}
          <div className="contact-info-col">
            <span className="section-badge">AGENCY CHANNELS</span>
            <h2>Get in touch.</h2>
            
            <ul className="contact-info-list">
              <li>
                <div className="icon-badge">
                  <Mail size={18} color="var(--gold)" />
                </div>
                <div>
                  <p className="info-label">Email us</p>
                  <a href="mailto:hello@goldstar.agency" className="info-val">hello@goldstar.agency</a>
                </div>
              </li>
              <li>
                <div className="icon-badge">
                  <Phone size={18} color="var(--gold)" />
                </div>
                <div>
                  <p className="info-label">Call us</p>
                  <a href="tel:+15550001234" className="info-val">+1 (555) 000-1234</a>
                </div>
              </li>
              <li>
                <div className="icon-badge">
                  <MapPin size={18} color="var(--gold)" />
                </div>
                <div>
                  <p className="info-label">Office</p>
                  <span className="info-val">San Francisco, CA</span>
                </div>
              </li>
            </ul>

            <hr className="contact-divider" />

            <h4 className="bullets-title">What happens next?</h4>
            <ul className="contact-bullets">
              <li>
                <CheckCircle2 size={16} color="var(--gold)" />
                <span>Schedule a free technical session.</span>
              </li>
              <li>
                <CheckCircle2 size={16} color="var(--gold)" />
                <span>Get transparent project estimates.</span>
              </li>
              <li>
                <CheckCircle2 size={16} color="var(--gold)" />
                <span>Partner with senior product engineers.</span>
              </li>
            </ul>

            <div className="contact-socials-row">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LN</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">TW</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GH</a>
            </div>
          </div>

          {/* Right Column: Interactive Form & Tab Controls */}
          <div className="contact-form-col">
            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle2 size={48} color="var(--gold)" className="success-icon" />
                {submittedType === 'standard' ? (
                  <>
                    <h3>Application received!</h3>
                    <p>We will review your project details and reach out within 24 hours.</p>
                  </>
                ) : (
                  <>
                    <h3>AI Scope Blueprint Approved!</h3>
                    <p>Your technical specifications and dynamic sprint estimates have been saved. Our principal engineers will contact you to schedule kickoff.</p>
                  </>
                )}
                <button className="btn btn-outline btn-sm" onClick={handleResetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* Tab toggle headers */}
                <div className="contact-tabs">
                  <button
                    type="button"
                    className={`contact-tab-btn ${activeTab === 'standard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('standard')}
                  >
                    Standard Inquiry
                  </button>
                  <button
                    type="button"
                    className={`contact-tab-btn ${activeTab === 'ai-builder' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ai-builder')}
                  >
                    AI Proposal Architect
                  </button>
                </div>

                {/* Standard Inquiry Form */}
                {activeTab === 'standard' ? (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className={errors.name ? 'input-error' : ''}
                        required
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="hello@company.com"
                        className={errors.email ? 'input-error' : ''}
                        required
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="service">Requested Service</label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={errors.service ? 'input-error' : ''}
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="development">Software Development</option>
                        <option value="ai">AI Automation</option>
                        <option value="design">Web Design</option>
                        <option value="ai-search-aeo-geo">AI Search (AEO/GEO)</option>
                      </select>
                      {errors.service && <span className="error-text">{errors.service}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Project Brief</label>
                      <textarea
                        id="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your timeline, scope, and objectives"
                        className={errors.message ? 'input-error' : ''}
                        required
                      ></textarea>
                      {errors.message && <span className="error-text">{errors.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-full submit-btn">
                      <span>Send Project Brief</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  /* AI Proposal Builder - Multi-Step Wizard */
                  <div className="ai-proposal-wizard">
                    
                    {/* Step Dots Indicators */}
                    <div className="step-indicators-wrapper">
                      <div className={`step-dot ${aiStep >= 1 ? 'active' : ''}`}><span>1</span></div>
                      <div className={`step-line ${aiStep >= 2 ? 'active' : ''}`}></div>
                      <div className={`step-dot ${aiStep >= 2 ? 'active' : ''}`}><span>2</span></div>
                      <div className={`step-line ${aiStep >= 3 ? 'active' : ''}`}></div>
                      <div className={`step-dot ${aiStep >= 3 ? 'active' : ''}`}><span>3</span></div>
                    </div>

                    {/* Step 1: Info */}
                    {aiStep === 1 && (
                      <div className="ai-step-pane reveal-instant">
                        <h4>Let's identify your business.</h4>
                        <p className="ai-step-desc">Enter your credentials to connect the scoping engine.</p>
                        
                        <div className="form-group">
                          <label htmlFor="ai-name">Full Name</label>
                          <input
                            type="text"
                            id="ai-name"
                            value={aiName}
                            onChange={(e) => {
                              setAiName(e.target.value);
                              if (aiErrors.name) setAiErrors(prev => ({ ...prev, name: '' }));
                            }}
                            placeholder="Enter your name"
                            className={aiErrors.name ? 'input-error' : ''}
                            required
                          />
                          {aiErrors.name && <span className="error-text">{aiErrors.name}</span>}
                        </div>

                        <div className="form-group">
                          <label htmlFor="ai-email">Work Email</label>
                          <input
                            type="email"
                            id="ai-email"
                            value={aiEmail}
                            onChange={(e) => {
                              setAiEmail(e.target.value);
                              if (aiErrors.email) setAiErrors(prev => ({ ...prev, email: '' }));
                            }}
                            placeholder="hello@company.com"
                            className={aiErrors.email ? 'input-error' : ''}
                            required
                          />
                          {aiErrors.email && <span className="error-text">{aiErrors.email}</span>}
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary btn-full submit-btn"
                          onClick={handleAiStep1Next}
                        >
                          <span>Configure Parameters</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Sliders & Settings */}
                    {aiStep === 2 && (
                      <div className="ai-step-pane reveal-instant">
                        <h4>Configure project parameters.</h4>
                        <p className="ai-step-desc">Set budgets and outline systems to generate a customized proposal.</p>
                        
                        {/* Budget Slider */}
                        <div className="form-group slider-group">
                          <div className="slider-label-row">
                            <label>Target Budget Limit</label>
                            <span className="slider-val gold-text">${budgetVal.toLocaleString()}</span>
                          </div>
                          <input
                            type="range"
                            min="5000"
                            max="150000"
                            step="5000"
                            value={budgetVal}
                            onChange={(e) => setBudgetVal(Number(e.target.value))}
                            className="calculator-slider"
                          />
                          <div className="slider-limits">
                            <span>$5,000</span>
                            <span>$150,000+</span>
                          </div>
                        </div>

                        {/* Timeline Selector */}
                        <div className="form-group">
                          <label>Required Timeline</label>
                          <div className="option-grid">
                            {[
                              { key: '4-weeks', label: '4 Wks (Fast)' },
                              { key: '8-weeks', label: '8 Wks (Standard)' },
                              { key: '12-weeks', label: '12 Wks (Extended)' },
                              { key: '16-weeks', label: '16+ Wks (Enterprise)' }
                            ].map((t) => (
                              <button
                                key={t.key}
                                type="button"
                                className={`option-btn ${timelineVal === t.key ? 'active' : ''}`}
                                onClick={() => setTimelineVal(t.key)}
                              >
                                {t.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Complexity Selector */}
                        <div className="form-group">
                          <label>Architecture Complexity</label>
                          <div className="option-grid">
                            {[
                              { key: 'mvp', label: 'MVP / Lean' },
                              { key: 'custom', label: 'Bespoke / Custom' },
                              { key: 'enterprise', label: 'Enterprise' }
                            ].map((c) => (
                              <button
                                key={c.key}
                                type="button"
                                className={`option-btn ${complexityVal === c.key ? 'active' : ''}`}
                                onClick={() => setComplexityVal(c.key)}
                              >
                                {c.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Features Selection Pills */}
                        <div className="form-group">
                          <label>Core Capabilities Required</label>
                          <div className="features-checkbox-grid">
                            {[
                              { key: 'design', label: 'UI/UX Design' },
                              { key: 'frontend', label: 'Frontend App' },
                              { key: 'backend', label: 'API Backend' },
                              { key: 'database', label: 'Database Setup' },
                              { key: 'ai-integration', label: 'AI LLM Sync' }
                            ].map((f) => {
                              const isSelected = selectedFeatures.includes(f.key);
                              return (
                                <button
                                  key={f.key}
                                  type="button"
                                  className={`feature-pill-btn ${isSelected ? 'active' : ''}`}
                                  onClick={() => {
                                    if (isSelected) {
                                      if (selectedFeatures.length > 1) {
                                        setSelectedFeatures(prev => prev.filter(item => item !== f.key));
                                      }
                                    } else {
                                      setSelectedFeatures(prev => [...prev, f.key]);
                                    }
                                  }}
                                >
                                  <span className="pill-dot"></span>
                                  <span>{f.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="ai-actions-row">
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => setAiStep(1)}
                          >
                            <ArrowLeft size={14} /> Back
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={handleStartScoping}
                          >
                            <span>Compile AI Proposal</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Console Compilation & Proposal Display */}
                    {aiStep === 3 && (
                      <div className="ai-step-pane reveal-instant">
                        {isScoping ? (
                          <div className="ai-scoping-loading">
                            <h4>Compiling scope and allocations...</h4>
                            <p className="ai-step-desc font-sm">Running simulator models based on your constraints.</p>
                            
                            <div className="console-card scoping-terminal">
                              <div className="console-header">
                                <div className="window-dots">
                                  <span className="dot red"></span>
                                  <span className="dot yellow"></span>
                                  <span className="dot green"></span>
                                </div>
                                <span className="terminal-title">scoping-agent-logs.sh</span>
                              </div>
                              <div className="console-body terminal-logs-body">
                                {scopingLogs.map((log, i) => (
                                  <div key={i} className={`terminal-log-line ${log.startsWith('✔') || log.startsWith('✨') ? 'success' : ''}`}>
                                    {log}
                                  </div>
                                ))}
                                <div className="terminal-cursor-line">
                                  <span className="terminal-spinner">⚡</span>
                                  <span className="terminal-text">Processing allocations...</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="ai-proposal-results">
                            <h4>Calculated Project Proposal</h4>
                            <p className="ai-step-desc">A customized development roadmap has been built below.</p>

                            <div className="blueprint-details-card">
                              <div className="blueprint-header-stamp">
                                <span className="stamp-title">TECHNICAL SPECIFICATION SHEET</span>
                                <span className="stamp-id">REF: GS-{Math.floor(Math.random() * 89999 + 10000)}</span>
                              </div>

                              <div className="blueprint-summary-metrics">
                                <div className="metric-box">
                                  <span className="metric-lbl">ESTIMATED INVESTMENT</span>
                                  <span className="metric-val glow-text">${scopingOutput.estimatedCost.toLocaleString()}</span>
                                  {scopingOutput.budgetConstrained && (
                                    <span className="metric-sub-lbl warning-badge">⚠️ Optimized to budget limit</span>
                                  )}
                                </div>
                                <div className="metric-box">
                                  <span className="metric-lbl">TIMELINE CYCLE</span>
                                  <span className="metric-val">{scopingOutput.sprints} Sprints ({scopingOutput.timelineWeeks} Wks)</span>
                                </div>
                              </div>

                              <div className="blueprint-meta-list">
                                <div className="meta-item">
                                  <strong>Recommended Tech Stack:</strong>
                                  <div className="tech-tags-row">
                                    {scopingOutput.techStack.map((tech) => (
                                      <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                  </div>
                                </div>

                                <div className="sprint-plan-box">
                                  <strong>Proposed Sprint Roadmap:</strong>
                                  <ul className="sprint-roadmap-list">
                                    {scopingOutput.sprintBreakdown.map((sprint, idx) => (
                                      <li key={idx}>
                                        <div className="sprint-num">Sprint 0{idx + 1}</div>
                                        <div className="sprint-desc">{sprint}</div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="ai-actions-row">
                              <button
                                type="button"
                                className="btn btn-outline btn-sm"
                                onClick={() => setAiStep(2)}
                              >
                                Refine Scope
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={handleApproveScope}
                              >
                                <span>Approve Scope & Submit Brief</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}
              </>
            )}

            <div className="form-footer-badge">
              <span className="badge-pill">⏳ We reply within 24 hours</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
