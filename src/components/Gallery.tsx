import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronDown, Maximize2 } from 'lucide-react';

interface GalleryItem {
  src: string;
  category: 'Chamber' | 'Seminars' | 'Media';
  title: string;
  description: string;
}

/* Cards shown before the "View More" reveal */
const INITIAL_VISIBLE = 9;

export default function Gallery() {
  const galleryItems: GalleryItem[] = [
    {
      src: 'gallery/g01.jpg',
      category: 'Chamber',
      title: 'Advocate Chamber Board',
      description: 'Official identification board displayed outside the primary litigation office in Datia.',
    },
    {
      src: 'gallery/g02.jpg',
      category: 'Chamber',
      title: 'Workstations & Legal Office',
      description: 'Modern workspace designed for client consultations, legal documentation, and return filings.',
    },
    {
      src: 'gallery/g03.jpg',
      category: 'Chamber',
      title: 'Reception Waiting Lounge',
      description: 'A welcoming and comfortable space equipped with tax literature for visiting clients.',
    },
    {
      src: 'gallery/g04.jpg',
      category: 'Chamber',
      title: 'Frosted Glass Main Entrance',
      description: 'Main entry door of the chambers of Advocate Shailendra Yadav & Tax Consultants.',
    },
    {
      src: 'gallery/g05.jpg',
      category: 'Chamber',
      title: 'Tax Act Reference Library',
      description: 'Reference bookshelves housing essential commentary on GST, VAT, and Income Tax Acts.',
    },
    {
      src: 'gallery/g06.jpg',
      category: 'Chamber',
      title: 'Chamber Physical Shopfront',
      description: 'Secure rolling gate entrance of S. Yadav & Co. Law Chambers.',
    },
    {
      src: 'gallery/g07.jpg',
      category: 'Seminars',
      title: 'Legal Association Summit',
      description: 'Advocate Yadav with distinguished legal professionals and advocates at a state tax conference.',
    },
    {
      src: 'gallery/g08.jpg',
      category: 'Seminars',
      title: 'Keynote Presentation',
      description: 'Advocate Yadav speaking on GSTAT appellate guidelines at the TBK Litigation Network event.',
    },
    {
      src: 'gallery/g09.jpg',
      category: 'Seminars',
      title: 'Summit Panel Discussion',
      description: 'Advocate Yadav sitting as an expert panelist during the national tax consultation panel.',
    },
    {
      src: 'gallery/g10.jpg',
      category: 'Chamber',
      title: 'Executive Lounge Corner',
      description: 'Reception section showcasing awards, credentials, and legal symbol clocks.',
    },
    {
      src: 'gallery/g11.jpg',
      category: 'Chamber',
      title: 'Library Case Reading Area',
      description: 'Focused research table surrounded by historical and current litigation publications.',
    },
    {
      src: 'gallery/g12.jpg',
      category: 'Seminars',
      title: 'Professional Networking',
      description: 'Exchanging notes and collaborating with corporate law delegates at the tax conference.',
    },
    {
      src: 'gallery/g13.jpg',
      category: 'Chamber',
      title: 'Reporter Records Archive',
      description: 'Complete stacks of law reports, judgments, and active case files organized by state.',
    },
    {
      src: 'gallery/g14.jpg',
      category: 'Seminars',
      title: 'Corporate Litigation Seminar',
      description: 'Roundtable conference hosting key stakeholders and retail representatives to discuss compliance.',
    },
    {
      src: 'gallery/g15.jpg',
      category: 'Seminars',
      title: 'Pachmarhi Climbing Challenge',
      description: 'Advocate Yadav at the Pachmarhi Adventure Event, participating in community and adventure sports sponsorships.',
    },
    {
      src: 'gallery/g16.jpg',
      category: 'Seminars',
      title: 'Tax Practitioners Conference',
      description: 'Collaborating with delegates and sharing insights at a regional tax practitioners association event.',
    },
    {
      src: 'gallery/g17.jpg',
      category: 'Chamber',
      title: 'Executive Consultation Suite',
      description: 'Private meeting space designed for confidential client briefings and strategic litigation planning.',
    },
    {
      src: 'gallery/g18.jpg',
      category: 'Seminars',
      title: 'All India Tax Federation Podium',
      description: 'Advocate Yadav representing Madhya Pradesh at the All India Federation of Tax Practitioners summit.',
    },
    {
      src: 'gallery/g19.jpg',
      category: 'Seminars',
      title: 'National Budget Analysis Feature',
      description: 'Expert analysis of income tax rate changes published in local newspapers highlighting impacts on the middle class.',
    },
    {
      src: 'gallery/g20.jpg',
      category: 'Chamber',
      title: 'S. Yadav & Co. Office Interior',
      description: 'Award-winning architectural layout of the main litigation chamber and corporate team desks.',
    },
    {
      src: 'gallery/g21.jpg',
      category: 'Media',
      title: 'Live Television Interview',
      description: 'Adv. Yadav discussing GST and taxation developments in an exclusive live interview on High News.',
    },
    {
      src: 'gallery/g22.jpg',
      category: 'Media',
      title: 'Tax Bar Association Appointment',
      description: 'Dainik Bhaskar coverage of Adv. Yadav joining the executive committee of the M.P. Tax Law Bar Association.',
    },
    {
      src: 'gallery/g23.jpg',
      category: 'Media',
      title: 'Crackdown on Fake GST Registrations',
      description: 'Press report on the departmental campaign against fraudulent GST registrations, featuring Adv. Yadav.',
    },
    {
      src: 'gallery/g24.jpg',
      category: 'Media',
      title: 'Union Budget Reaction',
      description: 'Featured expert commentary: no fresh tax burden placed on the public in the Union Budget.',
    },
    {
      src: 'gallery/g25.jpg',
      category: 'Media',
      title: 'Budget Analysis Feature',
      description: 'Full-width newspaper analysis of the Union Budget with expert commentary by Adv. Yadav.',
    },
    {
      src: 'gallery/g26.jpg',
      category: 'Media',
      title: 'On Regional Development & Jobs',
      description: 'Quoted on employment prospects, improving connectivity, and the case for an investors\' summit in Datia.',
    },
    {
      src: 'gallery/g27.jpg',
      category: 'Media',
      title: 'Income Tax Expectations',
      description: 'Pre-budget expert opinion on income-tax relief, exemption limits, and standard deduction for taxpayers.',
    },
  ];

  const [activeFilter, setActiveFilter] = useState<'All' | 'Chamber' | 'Seminars' | 'Media'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  /* Collapse back to the initial set whenever the filter changes */
  const selectFilter = (value: typeof activeFilter) => {
    setActiveFilter(value);
    setShowAll(false);
  };

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filteredItems.length - visibleItems.length;

  const openLightbox = (src: string) => {
    const idx = galleryItems.findIndex(item => item.src === src);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="gallery" className="section-padding" style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      background: 'linear-gradient(rgba(251, 250, 247, 0.92), rgba(251, 250, 247, 0.96)), url("/images/bg_gallery.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Visual Tour</span>
          <h2 className="section-title">Chamber Gallery & Events</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            Explore our state-of-the-art tax litigation offices and active presence in legal education and summits.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'All Media', value: 'All' },
            { label: 'Chambers & Library', value: 'Chamber' },
            { label: 'Seminars & Events', value: 'Seminars' },
            { label: 'Press & Media', value: 'Media' }
          ].map(btn => {
            const isActive = activeFilter === btn.value;
            return (
              <button
                key={btn.value}
                onClick={() => selectFilter(btn.value as typeof activeFilter)}
                style={{
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  borderRadius: '30px',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--accent-gold)' : 'var(--card-border)',
                  backgroundColor: isActive ? 'var(--accent-gold)' : 'var(--card-bg)',
                  color: isActive ? '#030a09' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
          gap: '2rem'
        }}>
          {visibleItems.map((item, idx) => (
            <div
              key={item.src}
              className={`card glow-card ${showAll && idx >= INITIAL_VISIBLE ? 'gallery-reveal' : ''}`}
              onClick={() => openLightbox(item.src)}
              style={{
                padding: '1rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                animationDelay: showAll && idx >= INITIAL_VISIBLE ? `${Math.min((idx - INITIAL_VISIBLE) * 0.07, 0.8)}s` : undefined
              }}
            >
              {/* Image Container */}
              <div style={{
                width: '100%',
                height: '220px',
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-tertiary)'
              }}
              className="group-hover"
              >
                <img
                  src={`/images/${item.src}`}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                />
                
                {/* Maximize Icon Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: 'rgba(3, 10, 9, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }}
                className="hover-overlay"
                >
                  <Maximize2 size={24} style={{ color: 'var(--accent-gold)' }} />
                </div>
              </div>

              {/* Text Info */}
              <div style={{ marginTop: '1.25rem', padding: '0 0.5rem 0.5rem 0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    color: 'var(--accent-gold)'
                  }}>
                    {item.category === 'Chamber' ? 'Chamber & Library' : item.category === 'Media' ? 'Press & Media' : 'Seminar / Event'}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More — reveals the remaining photographs */}
        {hiddenCount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
            >
              <span>View More ({hiddenCount})</span>
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .gallery-reveal {
          opacity: 0;
          animation: galleryFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes galleryFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-reveal { animation: none; opacity: 1; }
        }
      `}</style>

      {/* Custom Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
            <X size={28} />
          </button>
          
          <button 
            style={{
              position: 'absolute',
              left: 'clamp(0.5rem, 2vw, 2rem)',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1010,
              transition: 'all 0.3s ease'
            }}
            onClick={prevImage}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--accent-gold)';
              e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
            }}
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`/images/${galleryItems[lightboxIndex].src}`}
              alt={galleryItems[lightboxIndex].title}
              className="lightbox-img"
            />
            <h3 className="lightbox-caption">{galleryItems[lightboxIndex].title}</h3>
            <p className="lightbox-desc">{galleryItems[lightboxIndex].description}</p>
          </div>

          <button 
            style={{
              position: 'absolute',
              right: 'clamp(0.5rem, 2vw, 2rem)',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1010,
              transition: 'all 0.3s ease'
            }}
            onClick={nextImage}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--accent-gold)';
              e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
            }}
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  );
}
