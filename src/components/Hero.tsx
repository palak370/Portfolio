import { ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Book3D from './Book3D';

export default function Hero() {
  return (
    <header
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(2.5rem, 5vw, 5rem) 0',
        overflow: 'hidden',
        background: 'var(--hero-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background Grid Accent */}
      <div className="bg-grid-pattern"></div>

      {/* Decorative Blur Spheres */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accent-gold-rgb), 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--accent-gold-rgb), 0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Left Column: Text Content */}
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--accent-green-light)',
                border: '1px solid rgba(var(--accent-gold-rgb), 0.25)',
                padding: '0.6rem 1.25rem',
                borderRadius: '50px',
                color: 'var(--accent-gold)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              <Award size={16} />
              17+ Years of Practice as Tax Consultant
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                color: 'var(--text-primary)',
              }}
            >
              Adv. <span className="shimmer-text" style={{ fontWeight: 'bold' }}>Shailendra Yadav</span>
            </h1>

            {/* Subtitle */}
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.01em',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              Specializing in <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>GST Litigation & Tax Appeals</strong>
            </h2>

            {/* Bio Brief */}
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                marginBottom: '3rem',
                maxWidth: '560px',
              }}
            >
              With over <strong>17+ years of tax practice experience</strong> (since 2009) and dual qualifications in Commerce and Law (<strong>B.Com, LLB</strong>), I provide dedicated representation in complex <strong>GST litigation, audits, and GSTAT appeals</strong>. I represent corporate, commercial, and private clients across <strong>8+ states</strong>—including MP, Delhi, Maharashtra, UP, and Rajasthan—before Departmental Authorities, High Courts, and the GST Appellate Tribunal (GSTAT).
            </p>

            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <Link to="/contact" className="btn btn-primary">
                Book Consultation
                <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                View Services
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive 3D Portfolio Book */}
          <div className="hero-book-col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Book3D />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-book-col {
            margin-top: 2.5rem;
          }
        }
      `}</style>
    </header>
  );
}
