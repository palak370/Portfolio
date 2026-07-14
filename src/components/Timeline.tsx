import React, { useState, useEffect, useRef } from 'react';
import { Scale, Briefcase, Landmark, BookOpen } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const events: TimelineEvent[] = [
    {
      year: '2002',
      title: 'Tax Consultation Launch',
      description: 'Launched private tax consultancy in Datia, MP. Advised local businesses, retail networks, and partnerships on direct tax, accounting setup, and audit requirements.',
      icon: <Briefcase size={18} />,
    },
    {
      year: '2013',
      title: 'Statewide Expansion (MP)',
      description: 'Formed representations for commercial guilds and manufacturing hubs throughout Madhya Pradesh, handling tax scrutiny cases and complex VAT registrations.',
      icon: <BookOpen size={18} />,
    },
    {
      year: '2017',
      title: 'GST Launch & Specialization Pivot',
      description: 'Following the implementation of the Goods and Services Tax (GST), transitioned specialization entirely to GST litigation, recognizing the unique compliance demands.',
      icon: <Scale size={18} />,
    },
    {
      year: '2021 - Present',
      title: 'Appellate & Multi-State Practice',
      description: 'Representing key clients before first appellate authorities, High Courts, and preparing briefs for GSTAT across India including Delhi, Maharashtra, UP, and Rajasthan.',
      icon: <Landmark size={18} />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.5; // Trigger line at the middle of screen
      let closestIndex = 0;
      let minDistance = Infinity;

      rowRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIdx(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially to set active card on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" className="section-padding" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Milestones</span>
          <h2 className="section-title">24 Years of Legal Practice</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            A track record of adapting, specializing, and delivering results in corporate taxation.
          </p>
        </div>

        {/* Timeline body */}
        <div style={{ position: 'relative', marginTop: '4rem' }}>
          {/* Central Line */}
          <div className="timeline-line"></div>

          {/* Events list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              const isActive = activeIdx === index;
              
              return (
                <div
                  key={index}
                  ref={(el) => { rowRefs.current[index] = el; }}
                  style={{
                    display: 'flex',
                    position: 'relative',
                    width: '100%',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                  }}
                  className="timeline-row"
                >
                  {/* Card Wrapper (for slide animation and layout) */}
                  <div
                    style={{
                      width: '45%',
                    }}
                    className={`timeline-card-col ${isEven ? 'timeline-card-col-left' : 'timeline-card-col-right'}`}
                  >
                    <div
                      className={`card glow-card timeline-card ${isEven ? 'timeline-card-left' : 'timeline-card-right'} ${isActive ? 'active' : ''}`}
                      style={{
                        padding: '2.25rem',
                        width: '100%',
                        border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--card-border)',
                        boxShadow: isActive ? '0 25px 50px var(--shadow-color), var(--glow-gold)' : '0 10px 30px var(--shadow-color)',
                      }}
                    >
                      <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-gold)', display: 'block', marginBottom: '0.5rem' }}>
                        {event.year}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                        {event.title}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                      border: '2px solid var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2,
                      boxShadow: isActive ? '0 0 25px rgba(var(--accent-gold-rgb), 0.7)' : 'var(--glow-gold)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer'
                    }}
                    className={`timeline-node ${isActive ? 'active' : ''}`}
                  >
                    <span style={{ color: isActive ? '#030a09' : 'var(--accent-gold)', transition: 'color 0.4s', display: 'inline-flex' }}>
                      {event.icon}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .timeline-card {
          opacity: 0;
          transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.6s ease-out, 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease;
        }

        .timeline-card-left {
          clip-path: inset(0 0 0 100%);
          transform: translateX(30px) translateY(0);
        }
        .timeline-card-left.active {
          clip-path: inset(0 0 0 0);
          transform: translateX(0) translateY(-6px);
          opacity: 1;
        }

        .timeline-card-right {
          clip-path: inset(0 100% 0 0);
          transform: translateX(-30px) translateY(0);
        }
        .timeline-card-right.active {
          clip-path: inset(0 0 0 0);
          transform: translateX(0) translateY(-6px);
          opacity: 1;
        }

        .timeline-node {
          transform: translateX(-50%) scale(1);
        }
        .timeline-node.active {
          transform: translateX(-50%) scale(1.25);
        }

        @media (max-width: 768px) {
          .timeline-card-left {
            clip-path: inset(0 100% 0 0) !important;
            transform: translateX(-30px) translateY(0) !important;
          }
          .timeline-card-left.active {
            clip-path: inset(0 0 0 0) !important;
            transform: translateX(0) translateY(-6px) !important;
            opacity: 1 !important;
          }
          .timeline-row {
            justify-content: flex-end !important;
          }
          .timeline-card-col {
            width: calc(100% - 60px) !important;
            margin-left: auto !important;
          }
          .timeline-node {
            left: 21px !important;
            transform: scale(1) !important;
          }
          .timeline-node.active {
            left: 21px !important;
            transform: scale(1.25) !important;
          }
        }
      `}</style>
    </section>
  );
}
