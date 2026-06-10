import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Megaphone, Code, Cpu, Layers, CheckCircle, ArrowLeft, Play, Settings, RefreshCw, Search } from 'lucide-react';
import useReveal from '../utils/useReveal';
import './ServiceDetail.css';

// Content structure for each service
const servicesData = {
  'digital-marketing': {
    icon: <Megaphone size={24} color="var(--gold)" />,
    tag: 'Digital Marketing',
    title: 'Drive pipeline growth.',
    desc: 'Data-driven performance campaigns that turn visibility into client revenue. We deploy and optimize multi-channel strategies with rigorous tracking metrics.',
    detailed: 'We focus on customer acquisition, not vanity metrics. By combining algorithmic advertising, continuous split testing, and detailed attribution setup, we scale lead flow while maintaining optimized customer acquisition costs (CAC).',
    bullets: [
      'Multi-channel campaign deployment and management.',
      'Conversion rate optimization (CRO) landing pages.',
      'Attribution setup to trace exact marketing spend ROI.',
      'Audience segmentation and lookalike data structures.'
    ],
    accent: '#C9A84C'
  },
  'software-development': {
    icon: <Code size={24} color="var(--gold)" />,
    tag: 'Software Development',
    title: 'Build solid software.',
    desc: 'High-performance engineering across custom web applications, API integrations, and robust database architectures.',
    detailed: 'Our development team writes modular, tested React and Node.js code designed to support infinite scaling. We configure stable databases, secure server endpoints, and automated CI/CD pipelines to keep releases fast and bug-free.',
    bullets: [
      'Single-page application and React UI engineering.',
      'Microservice and REST/GraphQL API backends.',
      'Relational and NoSQL database engine configuration.',
      'Secure hosting infrastructure deployment.'
    ],
    accent: '#A1A1AA'
  },
  'ai-automation': {
    icon: <Cpu size={24} color="var(--gold)" />,
    tag: 'AI Automation',
    title: 'Optimize operational speed.',
    desc: 'Intelligent language model integrations and custom background script flows that replace manual operational tasks.',
    detailed: 'We connect cutting-edge language models (LLMs) and cognitive agent scripts with your live enterprise systems. By designing automated parsing, slack triggers, and automated updates, we remove hundreds of hours of manual overhead.',
    bullets: [
      'Cognitive agent planning and prompt engineering.',
      'CRM automation and automatic record processing.',
      'Slack, email, and notification API integrations.',
      'Structured operational task cost drops.'
    ],
    accent: '#C9A84C'
  },
  'web-design': {
    icon: <Layers size={24} color="var(--gold)" />,
    tag: 'Web Design',
    title: 'Stun visual visitors.',
    desc: 'High-fidelity interface layouts and premium aesthetic systems designed to establish immediate brand authority.',
    detailed: 'Your digital footprint starts with aesthetic appeal. We craft bespoke responsive layouts using clean editorial typography scales, harmonious color schemes, custom graphic shapes, and micro-interactive CSS transitions.',
    bullets: [
      'Bespoke visual identity and prototype layouts.',
      'Responsive, fluid layout grid scaling tests.',
      'Micro-animations that increase user engagement.',
      'Conversion-centered lead landing pages.'
    ],
    accent: '#E6C2B4'
  },
  'ai-search-aeo-geo': {
    icon: <Search size={24} color="var(--gold)" />,
    tag: 'AI Search (AEO/GEO)',
    title: 'Rank in AI search engines.',
    desc: 'Optimize your digital content schema and authority signals to rank in conversational results on ChatGPT, Gemini, and Perplexity.',
    detailed: 'AI Search Optimization (AEO/GEO) is the next evolution of search engine optimization. Instead of indexing for keywords, we structure your site data, citations, and authority footprints so that large language models cite your brand as the leading solution in conversational answers.',
    bullets: [
      'JSON-LD semantic schema structure optimization.',
      'LLM crawler validation and index audits.',
      'Conversational authority footprint citations building.',
      'Generative engine citation rate tracking.'
    ],
    accent: '#C9A84C'
  }
};

export default function ServiceDetail() {
  useReveal();
  const { serviceId } = useParams();
  const data = servicesData[serviceId];

  // If service ID is not found, show 404 fallback
  if (!data) {
    return (
      <div className="service-fallback-page container">
        <h2>Service Not Found</h2>
        <p>The requested service path does not exist or has been modified.</p>
        <Link to="/services" className="btn btn-primary">View All Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* ── HERO BANNER ── */}
      <section className="service-detail-hero">
        <div className="container">
          <Link to="/services" className="back-link reveal">
            <ArrowLeft size={16} /> <span>Back to Services</span>
          </Link>
          <div className="hero-category-row reveal">
            <span className="tag tag-gold">
              {data.icon}
              <span>{data.tag}</span>
            </span>
          </div>
          <h1 className="reveal">{data.title}</h1>
        </div>
      </section>

      {/* ── DETAIL LAYOUT ── */}
      <section className="service-detail-body">
        <div className="container service-detail-grid">
          
          {/* Info Block */}
          <div className="service-info-column reveal">
            <h2>Overview</h2>
            <p className="lead-text">{data.desc}</p>
            <p className="body-text">{data.detailed}</p>
            
            <div className="bullets-section">
              <h3>Core Capabilities</h3>
              <ul className="service-bullets">
                {data.bullets.map((b, idx) => (
                  <li key={idx}>
                    <CheckCircle size={18} color="var(--gold)" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="service-actions">
              <Link to="/contact" className="btn btn-primary">Start a Project</Link>
              <Link to="/contact" className="btn btn-outline">Schedule Consultation</Link>
            </div>
          </div>

          {/* Interactive Playground Column */}
          <div className="service-visual-column reveal">
            <div className="interactive-tool-card">
              <div className="tool-card-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="tool-badge">INTERACTIVE PLAYGROUND</span>
              </div>
              
              <div className="tool-card-body">
                {serviceId === 'digital-marketing' && <MarketingFunnel />}
                {serviceId === 'software-development' && <SoftwareBlueprint />}
                {serviceId === 'ai-automation' && <AIWorkflowParser />}
                {serviceId === 'web-design' && <WebDesignGridCustomizer />}
                {serviceId === 'ai-search-aeo-geo' && <AISearchAuditor />}
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   SUB-COMPONENT SIMULATORS
   ──────────────────────────────────────────────────────── */

// 1. Marketing Funnel Simulator
function MarketingFunnel() {
  const [impressions, setImpressions] = useState(100000);
  const [conversionRate, setConversionRate] = useState(2.0);
  const [aov, setAov] = useState(75);

  const acquiredCustomers = Math.floor(impressions * (conversionRate / 100));
  const estimatedRevenue = acquiredCustomers * aov;
  const simulatedCost = Math.floor(impressions * 0.04 + 1000); // 4c CPC + retainer
  const roas = (estimatedRevenue / Math.max(1, simulatedCost)).toFixed(1);

  return (
    <div className="simulator-widget funnel-widget">
      <h4>Funnel ROI Simulator</h4>
      <p className="tool-desc">Drag sliders to test conversion metrics and gross returns.</p>

      <div className="sim-slider-group">
        <div className="slider-row">
          <label>Campaign Impressions</label>
          <span>{impressions.toLocaleString()}</span>
        </div>
        <input 
          type="range" min="10000" max="500000" step="10000"
          value={impressions} onChange={(e) => setImpressions(Number(e.target.value))}
          className="calculator-slider"
        />

        <div className="slider-row">
          <label>Conversion Rate</label>
          <span>{conversionRate}%</span>
        </div>
        <input 
          type="range" min="0.5" max="8.0" step="0.1"
          value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))}
          className="calculator-slider"
        />

        <div className="slider-row">
          <label>Average Order Value</label>
          <span>${aov}</span>
        </div>
        <input 
          type="range" min="20" max="400" step="5"
          value={aov} onChange={(e) => setAov(Number(e.target.value))}
          className="calculator-slider"
        />
      </div>

      <div className="sim-progress-track">
        <div className="sim-progress-bar" style={{ width: `${Math.min(100, (estimatedRevenue / 100000) * 100)}%` }}></div>
      </div>

      <div className="sim-results-grid">
        <div className="result-box">
          <span className="box-lbl">Customers</span>
          <span className="box-val gold-text">{acquiredCustomers.toLocaleString()}</span>
        </div>
        <div className="result-box">
          <span className="box-lbl">Est. Revenue</span>
          <span className="box-val glow-text">${estimatedRevenue.toLocaleString()}</span>
        </div>
        <div className="result-box full-width">
          <span className="box-lbl">Simulated ROAS (Gross Return / Spend)</span>
          <span className="box-val">{roas}x return</span>
        </div>
      </div>
    </div>
  );
}

// 2. Software Architecture Blueprint
function SoftwareBlueprint() {
  const [activeLayer, setActiveLayer] = useState('frontend');

  const layersInfo = {
    frontend: {
      title: 'Frontend Presentation Layer',
      desc: 'Build highly responsive user interfaces using React, HashRouter, GSAP, and styled CSS properties.',
      stack: ['React 19', 'React Router', 'GSAP', 'Lucide Icons'],
      logs: '✔ Hydration successful\n✔ GSAP timelines registered\n✔ Viewport matches CSS grid properties'
    },
    backend: {
      title: 'Application Server Layer',
      desc: 'Configured Node.js and Express RESTful interfaces handling logic constraints, encryption, and CRM pipelines.',
      stack: ['Node.js', 'Express.js', 'JWT Security', 'Validation API'],
      logs: '✔ API Listener active on port 4000\n✔ JWT Key decryption passed\n✔ Database query parsed (4ms)'
    },
    infra: {
      title: 'Cloud Infrastructure Layer',
      desc: 'Containerized infrastructure deployed globally using CI/CD pipelines, secure SSL modules, and caching nodes.',
      stack: ['Docker', 'Nginx Cache', 'Git Action CI', 'SSL Encryption'],
      logs: '✔ Docker image compiled\n✔ Static file caching active (gzip)\n✔ SSL Cert status: verified'
    }
  };

  const activeData = layersInfo[activeLayer];

  return (
    <div className="simulator-widget blueprint-widget">
      <h4>System Architecture Explorer</h4>
      <p className="tool-desc">Click architectural tiers to view technology stacks and compiled status readouts.</p>

      <div className="blueprint-selector-buttons">
        {Object.keys(layersInfo).map((layer) => (
          <button
            key={layer}
            className={`blueprint-btn ${activeLayer === layer ? 'active' : ''}`}
            onClick={() => setActiveLayer(layer)}
          >
            {layer.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="blueprint-detail-box">
        <h5>{activeData.title}</h5>
        <p className="layer-desc">{activeData.desc}</p>
        
        <div className="stack-tags">
          {activeData.stack.map((s) => (
            <span key={s} className="stack-tag">{s}</span>
          ))}
        </div>

        <div className="blueprint-terminal">
          <pre><code>{activeData.logs}</code></pre>
        </div>
      </div>
    </div>
  );
}

// 3. AI Automation Prompt Parser
function AIWorkflowParser() {
  const [activeTemplate, setActiveTemplate] = useState('lead');
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [payload, setPayload] = useState(null);

  const templates = {
    lead: {
      label: 'Lead Qualifier',
      input: 'Lead: Dan, Project Budget: $30k, Needs: Software Dev + AI.',
      steps: [
        'Connecting to pipeline parser model...',
        'Extracting entity metrics: Name="Dan", Budget=30000...',
        'Matching agency services... MATCH FOUND (Software, AI)...',
        'Generating qualification scores: SCORE=9.5/10 (High Priority)...',
        'Creating Salesforce record and pushing notification to Slack...'
      ],
      output: { status: 'Qualified', priority: 'High', routeTo: 'Sales Lead', workspaceId: 'gs_lead_8721' }
    },
    email: {
      label: 'Email responder',
      input: 'Email: "Hi, do you build static landing sites? Budget: $2k"',
      steps: [
        'Reading inbound email content...',
        'Evaluating project feasibility (Budget threshold check)...',
        'feasibility result: BELOW MINIMUM RETRACTED ($5k limit)...',
        'Drafting polite redirect response referring to standard templates...',
        'Injecting automated calendly links for short booking calls...'
      ],
      output: { action: 'Redirect response drafted', status: 'Archive-Pending', replySent: true }
    }
  };

  const handleRun = () => {
    if (running) return;
    setRunning(true);
    setLogs([]);
    setPayload(null);

    const activeTemp = templates[activeTemplate];
    
    activeTemp.steps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        if (idx === activeTemp.steps.length - 1) {
          setPayload(JSON.stringify(activeTemp.output, null, 2));
          setRunning(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="simulator-widget agent-widget">
      <h4>AI Workflow Agent Simulator</h4>
      <p className="tool-desc">Select an automated agent task, click trigger, and watch operations process.</p>

      <div className="agent-template-selector">
        {Object.keys(templates).map((key) => (
          <button
            key={key}
            className={`agent-tab-btn ${activeTemplate === key ? 'active' : ''}`}
            onClick={() => {
              if (running) return;
              setActiveTemplate(key);
              setLogs([]);
              setPayload(null);
            }}
          >
            {templates[key].label}
          </button>
        ))}
      </div>

      <div className="agent-mock-brief">
        <span className="widget-label">Brief Input Payload</span>
        <div className="brief-input-box">{templates[activeTemplate].input}</div>
      </div>

      <div className="agent-console">
        {logs.length === 0 ? (
          <div className="console-empty">Console inactive. Click button below to run.</div>
        ) : (
          <div className="console-lines">
            {logs.map((l, i) => (
              <div key={i} className="console-line-item">⚙ {l}</div>
            ))}
            {payload && (
              <pre className="payload-box">
                <code>{payload}</code>
              </pre>
            )}
          </div>
        )}
      </div>

      <button 
        className="btn-agent-run" 
        onClick={handleRun} 
        disabled={running}
      >
        {running ? 'Agent Executing...' : 'Execute Agent Workflow'}
      </button>
    </div>
  );
}

// 4. Web Design Grid Customizer
function WebDesignGridCustomizer() {
  const [viewport, setViewport] = useState('desktop');
  const [gridGap, setGridGap] = useState(24);
  const [fontFamily, setFontFamily] = useState('Bricolage');

  return (
    <div className="simulator-widget design-widget">
      <h4>Grid Viewport Customizer</h4>
      <p className="tool-desc">Toggle layout widths, grid spacing gaps, and font scaling in real-time.</p>

      <div className="design-customizer-controls">
        <div className="controls-group">
          <label>Scale Viewport</label>
          <div className="control-pills">
            {['desktop', 'tablet', 'mobile'].map((v) => (
              <button 
                key={v} className={`ctrl-pill ${viewport === v ? 'active' : ''}`}
                onClick={() => setViewport(v)}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="controls-group">
          <label>Grid Gap spacing</label>
          <div className="control-pills">
            {[16, 24, 32].map((g) => (
              <button 
                key={g} className={`ctrl-pill ${gridGap === g ? 'active' : ''}`}
                onClick={() => setGridGap(g)}
              >
                {g}px
              </button>
            ))}
          </div>
        </div>

        <div className="controls-group">
          <label>Font Branding</label>
          <div className="control-pills">
            {['Bricolage', 'Inter'].map((f) => (
              <button 
                key={f} className={`ctrl-pill ${fontFamily === f ? 'active' : ''}`}
                onClick={() => setFontFamily(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="design-sim-viewport-wrapper">
        <div className={`viewport-card-sim ${viewport}`} style={{ gap: `${gridGap}px`, fontFamily: fontFamily === 'Bricolage' ? 'var(--font-display)' : 'var(--font-body)' }}>
          <div className="sim-layout-heading">Branded Agency</div>
          <div className="sim-layout-bar"></div>
          <div className="sim-layout-grid-row">
            <span className="sim-grid-col">Col 1</span>
            {viewport !== 'mobile' && <span className="sim-grid-col">Col 2</span>}
            {viewport === 'desktop' && <span className="sim-grid-col">Col 3</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. AI Search & Citation Auditor
function AISearchAuditor() {
  const [urlInput, setUrlInput] = useState('');
  const [scanning, setScanning] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditReport, setAuditReport] = useState(null);

  const runAudit = (e) => {
    e.preventDefault();
    if (!urlInput.trim() || scanning) return;
    setScanning(true);
    setAuditLogs([]);
    setAuditReport(null);

    const steps = [
      `⌛ Initializing semantic scan for: ${urlInput}...`,
      "⌛ Checking LLM crawler permissions in robots.txt...",
      "⌛ Crawling semantic JSON-LD structures and entity microdata...",
      "⌛ Matching entity citations across Wikipedia, GitHub, and PR index wires...",
      "⌛ Calculating conversational generation weight on Gemini and ChatGPT...",
      "✔ Audit scan completed successfully!"
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setAuditLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setAuditReport({
            crawlers: 'ALLOWED (100/100)',
            schemaScore: '82/100 (Missing local entity markup)',
            citationAuthority: '64/100 (Faint reference backlinks)',
            aiVisibilityRank: 'HIGH PRIORITY (Estimated 38% citation weight)'
          });
          setScanning(false);
        }
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="simulator-widget auditor-widget">
      <h4>AEO Indexing Auditor</h4>
      <p className="tool-desc">Enter a domain URL to run a semantic indexability scan for large language models.</p>

      <form className="auditor-input-form" onSubmit={runAudit}>
        <input 
          type="text" 
          placeholder="https://yourcompany.com" 
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          disabled={scanning}
          className="auditor-text-input"
          required
        />
        <button 
          type="submit" 
          className="btn-auditor-trigger"
          disabled={scanning}
        >
          {scanning ? 'Auditing...' : 'Analyze Indexability'}
        </button>
      </form>

      <div className="auditor-logs-terminal">
        {auditLogs.length === 0 ? (
          <div className="console-empty">Enter URL and trigger scan.</div>
        ) : (
          <div className="console-lines">
            {auditLogs.map((l, i) => (
              <div key={i} className="console-line-item">{l}</div>
            ))}
            {auditReport && (
              <div className="audit-results-report">
                <h5>LLM Auditing Scorecard</h5>
                <div className="report-metric-row">
                  <span className="metric-lbl">LLM Crawl Status</span>
                  <span className="metric-val">{auditReport.crawlers}</span>
                </div>
                <div className="report-metric-row">
                  <span className="metric-lbl">JSON-LD Schema Score</span>
                  <span className="metric-val">{auditReport.schemaScore}</span>
                </div>
                <div className="report-metric-row">
                  <span className="metric-lbl">Citation Network Score</span>
                  <span className="metric-val">{auditReport.citationAuthority}</span>
                </div>
                <div className="report-metric-row highlight-row">
                  <span className="metric-lbl">AI Citation Visibility</span>
                  <span className="metric-val gold-text">{auditReport.aiVisibilityRank}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
