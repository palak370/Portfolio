import { useState, useEffect } from 'react';
import { ArrowRight, Award, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [positions, setPositions] = useState([0, 1, 2]);

  useEffect(() => {
    if (hoveredIdx !== null) return; // Pause auto-scroll on hover

    const timer = setInterval(() => {
      setPositions((prev) => prev.map((p) => (p + 1) % 3));
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(timer);
  }, [hoveredIdx]);

  const heroImages = [
    {
      src: '/images/image copy 3.png',
      alt: 'Advocate Yadav Chamber Door',
    },
    {
      src: '/images/image copy 15.png',
      alt: 'Tax Practitioners Conference',
    },
    {
      src: '/images/image copy 7.png',
      alt: 'Adv. Shailendra Yadav Speaking at Seminar',
      showBadge: true
    }
  ];

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

          {/* Right Column: Premium Visual Overlapping Images */}
          <div className="animate-float" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '400px' }} className="hero-images">
              {heroImages.map((img, idx) => {
                const pos = positions[idx];
                const isHovered = hoveredIdx === idx;
                
                const baseZ = pos + 1;
                const zIndex = isHovered ? 10 : baseZ;
                const transform = isHovered ? 'scale(1.08) translateY(-8px)' : 'scale(1) translateY(0)';
                const boxShadow = isHovered ? '0 20px 45px var(--shadow-color), var(--glow-gold)' : '0 10px 30px var(--shadow-color)';

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      boxShadow,
                      zIndex,
                      transform,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className={`hero-img-card hero-img-${pos}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {img.showBadge && (
                      /* Visual Accent Badge */
                      <div 
                        className="hero-badge"
                        style={{
                          position: 'absolute',
                          bottom: '1rem',
                          left: '1rem',
                          right: '1rem',
                          background: 'rgba(3, 10, 9, 0.8)',
                          backdropFilter: 'blur(10px)',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--card-border)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          zIndex: 20
                        }}
                      >
                        <Landmark size={18} style={{ color: 'var(--accent-gold)' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em' }}>
                          TBK Litigation Seminar Speaker
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        /* Desktop Offsets & Aspect Ratios */
        .hero-img-card {
          position: absolute;
          border-radius: var(--border-radius);
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hero-img-0 {
          top: 0px;
          left: 0px;
          width: 70%;
          height: 240px;
          border: 1px solid var(--card-border);
        }
        
        .hero-img-1 {
          top: 75px;
          left: 15%;
          width: 70%;
          height: 240px;
          border: 1.5px solid var(--accent-gold);
        }
        
        .hero-img-2 {
          bottom: 0px;
          right: 0px;
          width: 70%;
          height: 240px;
          border: 1.5px solid var(--accent-gold);
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .hero-images {
            height: 340px !important;
            max-width: 340px !important;
            margin: 2.5rem auto 0 auto;
          }
          
          .hero-img-card {
            height: 190px !important;
          }
          
          .hero-img-0 {
            top: 0px;
            left: 0px;
            width: 65%;
          }
          
          .hero-img-1 {
            top: 55px;
            left: 17.5%;
            width: 65%;
          }
          
          .hero-img-2 {
            bottom: 0px;
            right: 0px;
            width: 65%;
          }
        }

        @media (max-width: 480px) {
          .hero-images {
            height: 280px !important;
            max-width: 280px !important;
          }
          
          .hero-img-card {
            height: 160px !important;
          }
          
          .hero-badge {
            display: none !important; /* Hide badge on mobile to keep layout clean */
          }
        }
      `}</style>
    </header>
  );
}
