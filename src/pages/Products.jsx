import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, BarChart3, GitFork, ArrowUpRight } from 'lucide-react';
import useReveal from '../utils/useReveal';
import './Products.css';

export default function Products() {
  useReveal();

  const products = [
    {
      icon: <LayoutGrid size={24} color="var(--gold)" />,
      name: 'Iugale Workspace',
      desc: 'Collaborative project and task management dashboard designed specifically for fast-growing creative agencies.',
      tag: 'SaaS Platform'
    },
    {
      icon: <BarChart3 size={24} color="var(--gold)" />,
      name: 'GS Analytics',
      desc: 'Aggregated marketing dashboard tracking performance and attribution across social and search channels.',
      tag: 'Marketing Tool'
    },
    {
      icon: <GitFork size={24} color="var(--gold)" />,
      name: 'AutoFlow AI',
      desc: 'Drag-and-drop workflow builder that connects language models with your everyday internal office tools.',
      tag: 'AI Automator'
    }
  ];

  return (
    <div className="products-page">
      {/* ── HERO SECTION ── */}
      <section className="products-hero">
        <div className="container">
          <span className="tag tag-gold reveal">OUR PROPRIETARY SUITE</span>
          <h1 className="reveal">Tools we've built.</h1>
          <p className="products-subtext reveal">
            We build tools to automate our own operations and share them with the world. Explore our proprietary software solutions.
          </p>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="section products-list-section">
        <div className="container">
          <div className="products-grid stagger-group">
            {products.map((p, idx) => (
              <div key={idx} className="product-card stagger-item">
                <div className="product-card-top">
                  <div className="product-icon-wrapper">
                    {p.icon}
                  </div>
                  <span className="tag tag-sm">{p.tag}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <Link to="/contact" className="product-action-link">
                  <span>Learn more</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS CTA ── */}
      <section className="products-cta container">
        <div className="products-cta-band reveal">
          <h2>Need a custom SaaS solution?</h2>
          <p>We build proprietary tools and enterprise software tailored to your specific metrics.</p>
          <Link to="/contact" className="btn btn-primary">Start Building</Link>
        </div>
      </section>
    </div>
  );
}
