import { ClipboardCheck, FileSpreadsheet, Landmark, ShieldAlert, FileText, Search, Truck } from 'lucide-react';

export default function Services() {
  const serviceList = [
    {
      icon: <ShieldAlert size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'GST Notices and Replies',
      description: 'Professional drafting of technical replies against Show Cause Notices (SCN), returns scrutiny under Section 61, mismatch notices (2A/2B vs 3B), and enforcement/inspection summons. Sound defense to block arbitrary demands.',
      image: '/images/gst_reply_to_notices.jpg',
    },
    {
      icon: <Landmark size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'GST Appeals (Appellate authority & GSTAT)',
      description: 'Litigating disputes through all levels of appellate authorities. Expert drafting and oral arguments before First Appellate Authorities, GSTAT (GST Appellate Tribunal), and Writ Petitions before the hon\'ble high courts.',
      image: '/images/gst_appeals.jpg',
    },
    {
      icon: <ClipboardCheck size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'GST Registration',
      description: 'End-to-end guidance for obtaining fresh registrations, amending existing profiles, and cancellation/revocation of registration. Special emphasis on corporate categorization and structured business onboarding.',
      image: '/images/gst_registration.jpg',
    },
    {
      icon: <FileSpreadsheet size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'GST Return Filing',
      description: 'Precise preparation and filing of monthly, quarterly, and annual GST returns (GSTR-1, GSTR-3B, GSTR-9/9C Reconciliation). Comprehensive Input Tax Credit (ITC) reconciliation to prevent tax leakage and interest penalties.',
      image: '/images/gst_return_filing.jpg',
    },
    {
      icon: <FileText size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'GST audit cases',
      description: 'Comprehensive support and legal representation for GST audits conducted by department authorities. Preparing documentation, reconciliations, addressing audit queries, and resolving officer discrepancies.',
      image: '/images/gst_audits.jpg',
    },
    {
      icon: <Search size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'GST Scrutiny',
      description: 'Thorough analysis and response drafting for scrutiny of GST returns under Section 61. Rectifying discrepancies between GSTR-1, GSTR-3B, and GSTR-2B to mitigate penalties and ensure compliance.',
      image: '/images/gst_scrutiny.jpg',
    },
    {
      icon: <Truck size={20} style={{ color: 'var(--accent-gold)' }} />,
      title: 'Vehicle detention (under section 68) cases',
      description: 'Immediate legal assistance and representation for transit vehicle detention, seizure, and e-way bill penalty cases under Section 68. Swift drafting of replies to secure quick release of goods.',
      image: '/images/vehicle_detention.jpg',
    },
  ];

  return (
    <section id="services" className="section-padding" style={{ 
      position: 'relative',
      background: 'linear-gradient(rgba(251, 250, 247, 0.92), rgba(251, 250, 247, 0.96)), url("/images/bg_services.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Services & Expertise</span>
          <h2 className="section-title">GST Litigation & Advisory</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            Comprehensive tax consultancy specialized in ensuring compliance and robust courtroom representation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid-2">
          {serviceList.map((service, index) => (
            <div
              key={index}
              className="card glow-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '4px solid var(--accent-gold)',
                padding: 0,
                overflow: 'hidden',
                height: '100%',
              }}
            >
              <div style={{ width: '100%', height: '140px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={service.image}
                  alt={service.title}
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
                  {service.icon}
                </div>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
