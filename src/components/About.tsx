import { useState, useEffect } from 'react';
import { Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [positions, setPositions] = useState([0, 1, 2]);

  useEffect(() => {
    if (hoveredIdx !== null) return; // Pause auto-scroll on hover

    const timer = setInterval(() => {
      setPositions((prev) => prev.map((p) => (p + 1) % 3));
    }, 3000); // Rotate every 3 seconds

    return () => clearInterval(timer);
  }, [hoveredIdx]);

  const credentials = [
    { title: 'Bachelor of Commerce (B.Com)', description: 'Providing a robust understanding of corporate finance, trade structures, and accounting systems.' },
    { title: 'Bachelor of Laws (LLB)', description: 'Empowering professional representation, legal strategy, and trial arguments in courtrooms.' },
    { title: '17+ Years Professional Experience', description: 'Over a decade and a half of handling direct and indirect tax matters for businesses of all scales.' }
  ];

  const aboutImages = [
    { src: '/images/image copy 12.png', alt: 'Law Library Cabinets' },
    { src: '/images/image copy 16.png', alt: 'Advocate Yadav Profile' },
    { src: '/images/image copy 4.png', alt: 'Tax Reference Library' }
  ];

  return (
    <section id="about" className="section-padding" style={{ 
      position: 'relative', 
      background: 'linear-gradient(rgba(251, 250, 247, 0.92), rgba(251, 250, 247, 0.96)), url("/images/bg_about.png")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-grid-pattern"></div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Biography text */}
          <div className="animate-slide-up">
            <span className="section-subtitle">Biography</span>
            <h2 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              Tax Advocate & GST Litigator
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              I am <strong>Shailendra Yadav</strong>, Advocate. For the past 17 years, I have practiced as a dedicated Tax Consultant throughout the State of Madhya Pradesh.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Following the historic introduction of the Goods and Services Tax (GST) in 2017, I chose to specialize in the complex and evolving field of <strong>GST Litigation</strong>. This hyper-specialization has allowed me to represent clients facing high-value disputes and notices, representing them not only across Madhya Pradesh but in several other major commercial states—including Delhi, Uttar Pradesh, Maharashtra, Rajasthan, Punjab, and Telangana.
            </p>

            {/* Qualifications / Accordion Style Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {credentials.map((cred, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    background: 'var(--bg-secondary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--border-radius)',
                    borderLeft: '4px solid var(--accent-gold)',
                    borderTop: '1px solid var(--card-border)',
                    borderRight: '1px solid var(--card-border)',
                    borderBottom: '1px solid var(--card-border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={22} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '0.25rem', fontFamily: "var(--font-sans)" }}>
                      {cred.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {cred.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Highlight panel with Overlapping Chambers Images */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.05, color: 'var(--accent-gold)' }}>
              <Scale size={240} />
            </div>

            {/* Library Overlapping Images Showcase */}
            <div className="about-image-container" style={{ width: '100%', height: '300px', position: 'relative', marginBottom: '1.5rem' }}>
              {aboutImages.map((img, idx) => {
                const pos = positions[idx];
                const isHovered = hoveredIdx === idx;
                
                const baseZ = pos + 1;
                const zIndex = isHovered ? 10 : baseZ;
                const transform = isHovered ? 'scale(1.08) translateY(-8px)' : 'scale(1) translateY(0)';
                const boxShadow = isHovered ? '0 15px 35px rgba(0, 0, 0, 0.5), var(--glow-gold)' : '0 5px 15px rgba(0, 0, 0, 0.3)';

                return (
                  <img
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      boxShadow,
                      zIndex,
                      transform,
                    }}
                    className={`about-img-card about-img-${pos}`}
                  />
                );
              })}
            </div>

            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', borderBottom: '1px solid rgba(var(--accent-gold-rgb), 0.1)', paddingBottom: '0.75rem', zIndex: 3 }}>
              Core Philosophy
            </h3>

            <blockquote style={{ fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: '3px solid var(--accent-gold)', paddingLeft: '1rem', fontSize: '1.05rem', lineHeight: 1.6, zIndex: 3 }}>
              "GST law is dynamic and highly interpretive. Effective representation requires commerce-first thinking coupled with strict statutory interpretation to safeguard commercial interests."
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 3 }}>
              {[
                '17+ Years of Direct and Indirect Tax Experience',
                'Nationwide Litigation Presence (8+ States)',
                'Dual Expertise: Finance (B.Com) + Law (LLB)',
                'Expertise before High Courts & GSTAT Appeals'
              ].map((text, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', flexShrink: 0 }}></div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', zIndex: 3 }}>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Contact Advocate Yadav
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-img-card {
          position: absolute;
          object-fit: cover;
          border-radius: var(--border-radius);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .about-img-0 {
          top: 0px;
          left: 0px;
          width: 60%;
          height: 170px;
        }
        
        .about-img-1 {
          top: 45px;
          left: 20%;
          width: 60%;
          height: 170px;
          border: 1.5px solid var(--accent-gold);
        }
        
        .about-img-2 {
          bottom: 0px;
          right: 0px;
          width: 60%;
          height: 170px;
          border: 1.5px solid var(--accent-gold);
        }

        @media (max-width: 576px) {
          .about-image-container {
            width: 100% !important;
            height: 240px !important;
            max-width: 300px !important;
            margin: 0 auto 1.5rem auto !important;
          }
          
          .about-img-card {
            height: 140px !important;
          }
          
          .about-img-1 {
            top: 35px !important;
          }
        }
      `}</style>
    </section>
  );
}
