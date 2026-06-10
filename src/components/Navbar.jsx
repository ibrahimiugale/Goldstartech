import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Star, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Theme state defaulting to dark
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light-theme', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle scroll class toggle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.2 }
      );
    }
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header 
      ref={navRef} 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isMobileOpen ? 'navbar-mobile-active' : ''}`}
    >
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo" aria-label="Gold Star Home">
          <Star className="logo-star" fill="var(--gold)" color="var(--gold)" />
          <span>GoldStar</span>
        </Link>

        {/* Desktop Links */}
        <nav className="nav-menu">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
          
          {/* Services Dropdown */}
          <div ref={dropdownRef} className="nav-dropdown-wrapper">
            <button 
              className={`nav-link dropdown-toggle ${location.pathname.startsWith('/services') ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              Services <ChevronDown className="dropdown-chevron" size={14} />
            </button>
            
            {isDropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/services/digital-marketing" className="dropdown-item">Digital Marketing</Link>
                <Link to="/services/software-development" className="dropdown-item">Software Development</Link>
                <Link to="/services/ai-automation" className="dropdown-item">AI Automation</Link>
                <Link to="/services/web-design" className="dropdown-item">Web Design</Link>
                <Link to="/services/ai-search-aeo-geo" className="dropdown-item">AI Search (AEO/GEO)</Link>
                <hr className="dropdown-divider" />
                <Link to="/services" className="dropdown-item view-all-link">View All Services</Link>
              </div>
            )}
          </div>

          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Blog</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <button 
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/contact" className="btn btn-primary btn-sm">Start a Project</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isMobileOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <NavLink to="/" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="mobile-link" onClick={() => setIsMobileOpen(false)}>About</NavLink>
            
            <div className="mobile-sub-group">
              <span className="mobile-sub-title">Services</span>
              <div className="mobile-sub-links">
                <Link to="/services/digital-marketing" className="mobile-sub-link" onClick={() => setIsMobileOpen(false)}>Digital Marketing</Link>
                <Link to="/services/software-development" className="mobile-sub-link" onClick={() => setIsMobileOpen(false)}>Software Development</Link>
                <Link to="/services/ai-automation" className="mobile-sub-link" onClick={() => setIsMobileOpen(false)}>AI Automation</Link>
                <Link to="/services/web-design" className="mobile-sub-link" onClick={() => setIsMobileOpen(false)}>Web Design</Link>
                <Link to="/services/ai-search-aeo-geo" className="mobile-sub-link" onClick={() => setIsMobileOpen(false)}>AI Search (AEO/GEO)</Link>
              </div>
            </div>

            <NavLink to="/products" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Products</NavLink>
            <NavLink to="/blog" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Blog</NavLink>
            <NavLink to="/contact" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Contact</NavLink>
            
            <div className="mobile-sub-group">
              <span className="mobile-sub-title">Theme</span>
              <button 
                type="button" 
                onClick={toggleTheme} 
                className="mobile-theme-toggle"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={16} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={16} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
            
            <Link to="/contact" className="btn btn-primary mobile-cta-btn" onClick={() => setIsMobileOpen(false)}>Start a Project</Link>
          </div>
        </div>
      )}
    </header>
  );
}
