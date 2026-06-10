import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import useReveal from '../utils/useReveal';
import './Blog.css';

export default function Blog() {
  const [activeTab, setActiveTab] = useState('All');
  useReveal([activeTab]);

  const categories = ['All', 'Marketing', 'Development', 'AI'];

  const posts = [
    {
      title: 'Attribution engines that work.',
      category: 'Marketing',
      excerpt: 'How to structure multi-channel tracking to capture exact customer acquisition pathways.',
      date: 'June 08, 2026',
      readTime: '4 min read'
    },
    {
      title: 'React 19 bundle optimization.',
      category: 'Development',
      excerpt: 'Leverage new compiler features to drop runtime weights and boost site speeds.',
      date: 'May 28, 2026',
      readTime: '6 min read'
    },
    {
      title: 'Agentic AI operational systems.',
      category: 'AI',
      excerpt: 'Deploying LangChain agent routines that execute repetitive data-entry processes.',
      date: 'May 15, 2026',
      readTime: '8 min read'
    },
    {
      title: 'SEO layout guidelines.',
      category: 'Marketing',
      excerpt: 'How clean semantic headers and structured text loops boost organic rank search indicators.',
      date: 'May 02, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Database connection pools.',
      category: 'Development',
      excerpt: 'Structuring PostgreSQL server configurations to support scaling concurrent spikes.',
      date: 'April 22, 2026',
      readTime: '7 min read'
    },
    {
      title: 'Smart document parser routines.',
      category: 'AI',
      excerpt: 'Using advanced vision models to extract data from complex invoice PDF structures.',
      date: 'April 10, 2026',
      readTime: '5 min read'
    }
  ];

  // Filter posts based on active tab
  const filteredPosts = activeTab === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  return (
    <div className="blog-page">
      {/* ── HERO SECTION ── */}
      <section className="blog-hero">
        <div className="container">
          <span className="tag tag-gold reveal">AGENCY INSIGHTS</span>
          <h1 className="reveal">Insights & Ideas.</h1>
          <p className="blog-subtext reveal">
            Thought leadership covering scalable software engineering, AI automations, and growth marketing frameworks.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="blog-filter-section">
        <div className="container">
          <div className="filter-tabs reveal">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-tab-btn ${activeTab === c ? 'active' : ''}`}
                onClick={() => setActiveTab(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG CARDS GRID ── */}
      <section className="blog-list-section">
        <div className="container">
          <div className="blog-grid stagger-group">
            {filteredPosts.map((post, idx) => (
              <article key={idx} className="blog-card stagger-item">
                <div className="blog-card-meta">
                  <span className="tag tag-sm tag-gold">{post.category}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                
                <h3 className="blog-card-title">
                  <Link to="/contact">{post.title}</Link>
                </h3>
                
                <p className="blog-card-excerpt">{post.excerpt}</p>
                
                <div className="blog-card-footer">
                  <span className="blog-date">{post.date}</span>
                  <Link to="/contact" className="blog-read-link" aria-label={`Read post: ${post.title}`}>
                    <span>Read more</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
