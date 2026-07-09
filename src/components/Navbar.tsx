import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'var(--navbar-bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--card-border)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          height: '75px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontWeight: 600 }}>
            <img
              src="/images/logo.png"
              alt="Advocate Shailendra Yadav Logo"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '1.5px solid var(--accent-gold)',
                objectFit: 'cover',
                boxShadow: 'var(--glow-gold)',
                flexShrink: 0
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="nav-logo-text" style={{ fontFamily: "var(--font-serif)", fontSize: '1.2rem', letterSpacing: '0.04em', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                Adv. Shailendra Yadav
              </span>
              <span className="nav-logo-sub" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold)', fontWeight: 600 }}>
                GST Litigation & Tax Consultant
              </span>
            </div>
          </Link>
  
          {/* Desktop Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-only">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    style={({ isActive }) => ({
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      position: 'relative',
                      padding: '0.5rem 0',
                      transition: 'color 0.3s ease'
                    })}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--accent-gold)';
                    }}
                    onMouseLeave={(e) => {
                      const isActive = (e.target as HTMLElement).classList.contains('active');
                      (e.target as HTMLElement).style.color = isActive ? 'var(--accent-gold)' : 'var(--text-secondary)';
                    }}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
  
            {/* Theme & Menu Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Mobile Menu Button */}
              <button
                className="mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  padding: '0.6rem',
                  borderRadius: '50%',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(var(--accent-gold-rgb), 0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '75px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(251, 250, 247, 0.98)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '2.5rem',
            gap: '1.5rem',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            overflowY: 'auto',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: 0, margin: 0 }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                    display: 'block',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--card-border)',
                  })}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .nav-logo-text {
            font-size: 1.05rem !important;
          }
          .nav-logo-sub {
            font-size: 0.55rem !important;
            letter-spacing: 0.08em !important;
          }
        }
      `}</style>
    </>
  );
}
