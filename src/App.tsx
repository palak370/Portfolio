import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  const handleSelectNotice = (subject: string, message: string) => {
    setPrefilledSubject(subject);
    setPrefilledMessage(message);
  };

  const [footerOpen, setFooterOpen] = useState({
    links: false,
    tools: false,
    office: false
  });

  const toggleFooterSection = (section: 'links' | 'tools' | 'office') => {
    setFooterOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Navigation */}
      <Navbar />

      {/* Main Routing Switch */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage onSelectNotice={handleSelectNotice} />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage prefilledSubject={prefilledSubject} prefilledMessage={prefilledMessage} />} />
      </Routes>

      {/* Premium Footer */}
      <footer
        style={{
          backgroundColor: 'var(--footer-bg)',
          position: 'relative',
          zIndex: 5,
          padding: '0',
        }}
      >
        {/* Gold accent bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, transparent, var(--footer-border), transparent)' }} />

        <div className="container footer-container" style={{ padding: '4rem 2.5rem 2rem 2.5rem' }}>
          {/* Top Multi-column Area */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr 1.25fr',
              gap: '3rem',
              paddingBottom: '3rem',
              borderBottom: '1px solid rgba(var(--accent-gold-rgb), 0.15)',
              textAlign: 'left'
            }}
            className="footer-grid"
          >
            {/* Column 1: Firm Identity */}
            <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src="/images/logo.png"
                  alt="Advocate Shailendra Yadav Logo"
                  style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--accent-gold)',
                    objectFit: 'cover',
                    flexShrink: 0
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: '1.35rem', letterSpacing: '0.04em', color: 'var(--footer-text)', lineHeight: 1.2 }}>
                    Adv. Shailendra Yadav
                  </span>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold)', fontWeight: 600 }}>
                    GST Litigation & Tax
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--footer-text-muted)', lineHeight: 1.6, maxWidth: '280px' }}>
                Providing corporate, commercial, and private clients with expert tax litigation counsel and representation across 8+ states.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="footer-col">
              <h4 
                className="footer-col-header" 
                onClick={() => toggleFooterSection('links')}
                style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 700, 
                  color: 'var(--footer-text)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  marginBottom: '1.25rem', 
                  fontFamily: 'var(--font-sans)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>Quick Links</span>
                <ChevronDown size={16} className={`footer-chevron ${footerOpen.links ? 'open' : ''}`} style={{ color: 'var(--accent-gold)' }} />
              </h4>
              <div className={`footer-col-content ${footerOpen.links ? 'open' : ''}`}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'About Biography', href: '/about' },
                    { name: 'Services Offered', href: '/services' },
                    { name: 'Media Gallery', href: '/gallery' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        style={{ fontSize: '0.85rem', color: 'var(--footer-text-muted)' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-gold)'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--footer-text-muted)'}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Litigation Tools */}
            <div className="footer-col">
              <h4 
                className="footer-col-header" 
                onClick={() => toggleFooterSection('tools')}
                style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 700, 
                  color: 'var(--footer-text)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  marginBottom: '1.25rem', 
                  fontFamily: 'var(--font-sans)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>Litigation Tools</span>
                <ChevronDown size={16} className={`footer-chevron ${footerOpen.tools ? 'open' : ''}`} style={{ color: 'var(--accent-gold)' }} />
              </h4>
              <div className={`footer-col-content ${footerOpen.tools ? 'open' : ''}`}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { name: 'Notice Assistant', href: '/services' },
                    { name: 'Client Testimonials', href: '/gallery' },
                    { name: 'Schedule Consultation', href: '/contact' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        style={{ fontSize: '0.85rem', color: 'var(--footer-text-muted)' }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-gold)'}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--footer-text-muted)'}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4: Contact Info */}
            <div className="footer-col">
              <h4 
                className="footer-col-header" 
                onClick={() => toggleFooterSection('office')}
                style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 700, 
                  color: 'var(--footer-text)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  marginBottom: '1.25rem', 
                  fontFamily: 'var(--font-sans)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>Chamber Office</span>
                <ChevronDown size={16} className={`footer-chevron ${footerOpen.office ? 'open' : ''}`} style={{ color: 'var(--accent-gold)' }} />
              </h4>
              <div className={`footer-col-content ${footerOpen.office ? 'open' : ''}`}>
                <p style={{ fontSize: '0.85rem', color: 'var(--footer-text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  MIG 22, New Housing Board Colony,<br />
                  Jhansi Road, Datia (M.P.) - 475661, India
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <a href="tel:+919425123456" style={{ fontSize: '0.85rem', color: 'var(--footer-text)', fontWeight: 600 }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-gold)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--footer-text)'}
                  >
                    +91-94251-23456
                  </a>
                  <a href="mailto:shailendrayadav.adv@gmail.com" style={{ fontSize: '0.85rem', color: 'var(--footer-text-muted)' }}
                    onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--accent-gold)'}
                    onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--footer-text-muted)'}
                  >
                    shailendrayadav.adv@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Area */}
          <div
            style={{
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              textAlign: 'left'
            }}
            className="footer-bottom"
          >
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--footer-text-muted)', lineHeight: 1.5 }}>
                &copy; {new Date().getFullYear()} Advocate Shailendra Yadav. All Rights Reserved.
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--footer-text-muted)', marginTop: '0.25rem', opacity: 0.7 }}>
                Designed in compliance with GSTAT and High Court legal standards.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--footer-text-muted)' }}>M.P. Bar Association Member</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--footer-text-muted)' }}>Compliance Standards G-20</span>
            </div>
          </div>
        </div>

        <style>{`
          /* Footer Collapsible Accordion Styles */
          .footer-chevron {
            display: none;
            transition: transform 0.3s ease;
          }
          
          @media (max-width: 992px) {
            .footer-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 2.5rem !important;
            }
          }
          
          @media (max-width: 576px) {
            .footer-container {
              padding: 2rem 1.25rem 1.5rem 1.25rem !important;
            }
            .footer-grid {
              grid-template-columns: 1fr !important;
              gap: 0 !important;
            }
            .footer-brand {
              border-bottom: 1px solid rgba(var(--accent-gold-rgb), 0.15) !important;
              padding-bottom: 1.5rem !important;
              margin-bottom: 0.5rem !important;
            }
            .footer-bottom {
              flex-direction: column !important;
              align-items: flex-start !important;
              padding-top: 1.5rem !important;
            }
            .footer-col {
              border-bottom: 1px solid rgba(var(--accent-gold-rgb), 0.1);
              padding: 1rem 0 !important;
            }
            .footer-col-header {
              cursor: pointer;
              user-select: none;
              margin-bottom: 0 !important;
            }
            .footer-chevron {
              display: inline-flex;
            }
            .footer-chevron.open {
              transform: rotate(180deg);
            }
            .footer-col-content {
              height: 0;
              max-height: 0;
              overflow: hidden;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .footer-col-content.open {
              height: auto;
              max-height: 500px;
              opacity: 1;
              visibility: visible;
              padding-top: 1rem;
            }
          }

          /* Floating WhatsApp styles */
          .whatsapp-float:hover {
            transform: scale(1.1) rotate(5deg) !important;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4), 0 0 25px rgba(37, 211, 102, 0.6) !important;
          }
          
          @media (max-width: 768px) {
            .whatsapp-float {
              bottom: 1.5rem !important;
              right: 1.5rem !important;
              width: 50px !important;
              height: 50px !important;
            }
            .whatsapp-float svg {
              width: 28px !important;
              height: 28px !important;
            }
          }
        `}</style>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919425123456?text=Hello%20Advocate%20Shailendra%20Yadav%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20consult%20about%20a%20GST%20matter."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#25D366',
          color: '#ffffff',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(37, 211, 102, 0.4)',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
        }}
        className="whatsapp-float"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 448 512" width="30" height="30" fill="currentColor" style={{ marginLeft: '1px' }}>
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>
    </Router>
  );
}
