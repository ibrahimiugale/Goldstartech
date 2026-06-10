import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import useReveal from '../utils/useReveal';
import './Contact.css';

export default function Contact() {
  useReveal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form
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
    // Clear error as user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
    }
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

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col">
            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle2 size={48} color="var(--gold)" className="success-icon" />
                <h3>Application received!</h3>
                <p>We will review your project details and reach out within 24 hours.</p>
                <button className="btn btn-outline btn-sm" onClick={() => setIsSubmitted(false)}>
                  Send another message
                </button>
              </div>
            ) : (
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
