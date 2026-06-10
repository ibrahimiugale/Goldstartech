import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Column 1: Brand & Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <Star className="footer-logo-star" fill="var(--gold)" color="var(--gold)" size={20} />
            <span>GoldStar</span>
          </Link>
          <p className="footer-tagline">
            Crafting premium digital experiences through strategy, engineering, and automation.
          </p>
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">LN</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">TW</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">GH</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">IG</a>
          </div>
        </div>

        {/* Column 2: Company Links */}
        <div className="footer-col">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Services Links */}
        <div className="footer-col">
          <h4 className="footer-title">Services</h4>
          <ul className="footer-links">
            <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
            <li><Link to="/services/software-development">Software Development</Link></li>
            <li><Link to="/services/ai-automation">AI Automation</Link></li>
            <li><Link to="/services/web-design">Web Design</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Office */}
        <div className="footer-col">
          <h4 className="footer-title">Connect</h4>
          <ul className="footer-contact-list">
            <li>
              <Mail size={16} color="var(--gold)" />
              <a href="mailto:hello@goldstar.agency">hello@goldstar.agency</a>
            </li>
            <li>
              <Phone size={16} color="var(--gold)" />
              <a href="tel:+15550001234">+1 (555) 000-1234</a>
            </li>
            <li>
              <MapPin size={16} color="var(--gold)" />
              <span>San Francisco, CA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright">&copy; {currentYear} Gold Star. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
          <p className="footer-crafted">Crafted with precision & purpose.</p>
        </div>
      </div>
    </footer>
  );
}
