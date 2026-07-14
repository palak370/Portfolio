import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { ArrowRight, User, ShieldAlert, Image, Mail, FileText, Scale, ClipboardCheck, Briefcase, Coins, HelpCircle } from 'lucide-react';

export default function Home() {
  const teasers = [
    {
      title: 'Biography & Milestones',
      subtitle: 'About Advocate Yadav',
      description: 'Discover the 24+ year legal journey of Shailendra Yadav, specialized in High Court and GST Appellate litigation.',
      icon: <User size={20} style={{ color: 'var(--accent-gold)' }} />,
      to: '/about',
      btnText: 'Read Biography',
      image: '/images/about_teaser.jpg',
    },
    {
      title: 'Litigation & Notice Assistant',
      subtitle: 'GST Services & Tools',
      description: 'Facing GSTR-2B mismatches or audits? Access our consultation services and use our interactive Notice Assistant.',
      icon: <ShieldAlert size={20} style={{ color: 'var(--accent-gold)' }} />,
      to: '/services',
      btnText: 'Explore Services & Tools',
      image: '/images/gst_reply_to_notices.jpg',
    },
    {
      title: 'Contact & Consultations',
      subtitle: 'Get In Touch',
      description: 'Reach out to schedule a consultation at our Datia chamber or request virtual litigation support.',
      icon: <Mail size={20} style={{ color: 'var(--accent-gold)' }} />,
      to: '/contact',
      btnText: 'Schedule Consultation',
      image: '/images/contact_teaser.jpg',
    },
    {
      title: 'Media Gallery & Testimonials',
      subtitle: 'Client Stories',
      description: 'Browse photographs from our chamber offices, conference presentations, and review verified client testimonials.',
      icon: <Image size={20} style={{ color: 'var(--accent-gold)' }} />,
      to: '/gallery',
      btnText: 'Browse Gallery',
      image: '/images/gallery_teaser.jpg',
    },
  ];

  return (
    <div className="home-wrapper">
      <Hero />

      {/* Core Practice Areas Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--card-border)', position: 'relative' }}>
        <div className="bg-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="section-header">
            <span className="section-subtitle">Our Specializations</span>
            <h2 className="section-title">Core Practice Highlights</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem', maxWidth: '600px', margin: '1rem auto 0 auto' }}>
              Dedicated legal solutions across critical tax dispute domains, ensuring compliance and robust representation.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3.5rem' }}>
            {[
              {
                icon: <FileText size={22} style={{ color: 'var(--accent-gold)' }} />,
                title: 'GST SCN & Summons Defense',
                desc: 'Strategic defense representation for scrutiny notices (ASMT-10) and summons under Section 70.'
              },
              {
                icon: <Scale size={22} style={{ color: 'var(--accent-gold)' }} />,
                title: 'Appellate Litigation',
                desc: 'Drafting and oral advocacy before the First Appellate Authority and High Court Writ Petitions.'
              },
              {
                icon: <ClipboardCheck size={22} style={{ color: 'var(--accent-gold)' }} />,
                title: 'GST Audits & Reviews',
                desc: 'Handling comprehensive department audit summons and reconciling complex GSTR-2B vs 3B filings.'
              },
              {
                icon: <Briefcase size={22} style={{ color: 'var(--accent-gold)' }} />,
                title: 'Corporate Tax Advisory',
                desc: 'Structuring commercial transactions to maximize input tax credit (ITC) and prevent leakage.'
              },
              {
                icon: <Coins size={22} style={{ color: 'var(--accent-gold)' }} />,
                title: 'Refund Claim Recovery',
                desc: 'Securing complex refund applications for zero-rated exports and unblocking inverted tax structures.'
              },
              {
                icon: <HelpCircle size={22} style={{ color: 'var(--accent-gold)' }} />,
                title: 'Advance Rulings & Advice',
                desc: 'Representing classification disputes before the Authority for Advance Rulings (AAR).'
              }
            ].map((practice, index) => (
              <div 
                key={index} 
                className="glow-card" 
                style={{
                  padding: '2.25rem 1.75rem',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--card-border)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '46px',
                  height: '46px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--card-border)'
                }}>
                  {practice.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                  {practice.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {practice.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sectors We Serve Sub-header */}
          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <span className="section-subtitle" style={{ fontSize: '0.8rem' }}>Commercial Reach</span>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '0.5rem', fontFamily: 'var(--font-serif)' }}>Sectors We Represent</h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginTop: '2.5rem'
            }}>
              {[
                'Manufacturing & Heavy Industries',
                'Logistics & Warehousing',
                'Real Estate & Infrastructure',
                'FMCG & Modern Retail',
                'IT & Software Services',
                'Healthcare & Pharmaceuticals',
                'Hospitality & Tourism'
              ].map((sector, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '30px',
                    border: '1px solid rgba(var(--accent-gold-rgb), 0.25)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'default'
                  }}
                  className="sector-pill"
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></div>
                  <span>{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gateway Teasers Section */}
      <section className="section-padding" style={{ position: 'relative', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="bg-grid-pattern"></div>
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="section-header">
            <span className="section-subtitle">Chamber Services</span>
            <h2 className="section-title">Explore Our Firm</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem', maxWidth: '600px', margin: '1rem auto 0 auto' }}>
              Select a section below to learn more about our litigation services, use our GST assistant tools, or request a consultation.
            </p>
          </div>

          <div className="grid-2" style={{ gap: '2rem', marginTop: '3rem' }}>
            {teasers.map((teaser, index) => (
              <div
                key={index}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left',
                  height: '100%',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  padding: 0,
                }}
              >
                <div style={{ width: '100%', height: '140px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={teaser.image}
                    alt={teaser.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="card-cover-img"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(4, 4, 5, 0.75)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      padding: '0.5rem',
                      borderRadius: '50%',
                      border: '1px solid rgba(var(--accent-gold-rgb), 0.3)',
                    }}
                  >
                    {teaser.icon}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--accent-gold)',
                      }}
                    >
                      {teaser.subtitle}
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.15rem', marginBottom: '0.5rem' }}>
                      {teaser.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {teaser.description}
                    </p>
                  </div>

                  <Link
                    to={teaser.to}
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.6rem 0',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span>{teaser.btnText}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA Box */}
          <div
            className="card animate-slide-up"
            style={{
              marginTop: '4rem',
              padding: '3rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(var(--accent-gold-rgb), 0.05) 0%, rgba(var(--accent-gold-rgb), 0.12) 100%)',
              border: '1.5px solid var(--accent-gold)',
              boxShadow: 'var(--glow-gold)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Require Immediate GST Consultation?
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', marginBottom: '2rem', lineHeight: 1.6 }}>
              Submit details of your pending GST mismatch notice, litigation summon, or appeal request. Our firm provides comprehensive legal evaluations as soon as possible.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={16} />
              Schedule Online Consultation
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .sector-pill {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .sector-pill:hover {
          border-color: var(--accent-gold) !important;
          color: var(--text-primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(var(--accent-gold-rgb), 0.15) !important;
        }
      `}</style>
    </div>
  );
}
