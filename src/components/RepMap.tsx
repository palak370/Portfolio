import React, { useState } from 'react';
import { MapPin, ArrowRight, Building, ShieldAlert, Landmark, FileText } from 'lucide-react';

interface StateDetails {
  name: string;
  type: string;
  sectors: string[];
  cases: string;
  icon: React.ReactNode;
}

export default function RepMap() {
  const [activeState, setActiveState] = useState<string>('Madhya Pradesh');

  const statesData: Record<string, StateDetails> = {
    'Madhya Pradesh': {
      name: 'Madhya Pradesh (Base State)',
      type: 'Home Jurisdiction',
      sectors: ['Textiles', 'SMC', 'Agribusiness', 'Manufacturing', 'Automobile dealerships'],
      cases: 'Over 17 years of extensive tax advisory and representation before MP High Court (Jabalpur, Indore, Gwalior benches) and appellate authorities on complex ITC blockages.',
      icon: <Landmark size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
    'Delhi NCR': {
      name: 'Delhi NCR',
      type: 'Tribunal & High Court',
      sectors: ['E-commerce', 'IT Services', 'Logistics & Warehousing', 'Import/Export'],
      cases: 'Filing GSTAT appeals and representation in show-cause notice replies for multi-state logistics and service providers.',
      icon: <FileText size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
    'Maharashtra': {
      name: 'Maharashtra',
      type: 'Commercial Disputes',
      sectors: ['Corporate Services', 'Manufacturing', 'Infrastructure Contracting'],
      cases: 'Handling anti-evasion inquiry responses and audit replies for Pune & Mumbai-based industrial manufacturing units.',
      icon: <Building size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
    'Uttar Pradesh': {
      name: 'Uttar Pradesh',
      type: 'Appellate Representation',
      sectors: ['Metal Fabrication', 'Real Estate', 'FMCG Distributorships'],
      cases: 'Filing appeals and representations before the appellate authority at Noida and Lucknow benches for GST classification disputes.',
      icon: <ShieldAlert size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
    'Rajasthan': {
      name: 'Rajasthan',
      type: 'Litigation Advisory',
      sectors: ['Mining & Minerals', 'Tourism & Hospitality', 'Stone Processing'],
      cases: 'Representation on tax liability disputes on mining royalties and hospitality service tax adjustments.',
      icon: <Landmark size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
    'Punjab': {
      name: 'Punjab',
      type: 'Audit & Notice Defense',
      sectors: ['Agricultural Processing', 'Tool Manufacturing', 'Logistics'],
      cases: 'Scrutiny response filing and defending tax demands in audits concerning inter-state agricultural input supplies.',
      icon: <FileText size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
    'Telangana': {
      name: 'Telangana',
      type: 'Corporate Tax Counsel',
      sectors: ['Pharmaceuticals', 'Tech Consultancy', 'Chemicals'],
      cases: 'Drafting replies to DGGI notices and consulting on cross-border service tax classification under GST.',
      icon: <Building size={22} style={{ color: 'var(--accent-gold)' }} />,
    },
  };

  return (
    <section id="representation" className="section-padding" style={{ position: 'relative' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Jurisdictions</span>
          <h2 className="section-title">Multi-State Client Representation</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            Advocate Yadav regularly represents leading businesses in GST matters across major commercial hubs.
          </p>
        </div>

        {/* Interactive Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '3rem',
            alignItems: 'stretch'
          }}
          className="map-grid"
        >
          {/* Left Column: State List Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
              Select Region:
            </h3>
            {Object.keys(statesData).map((stateName) => {
              const isActive = activeState === stateName;
              return (
                <button
                  key={stateName}
                  onClick={() => setActiveState(stateName)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-gold)' : 'var(--card-border)',
                    backgroundColor: isActive ? 'rgba(var(--accent-gold-rgb), 0.08)' : 'var(--card-bg)',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(var(--accent-gold-rgb), 0.35)';
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <MapPin size={18} style={{ color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{stateName}</span>
                  </div>
                  <ArrowRight size={16} style={{ opacity: isActive ? 1 : 0.3, transform: isActive ? 'translateX(4px)' : 'none', transition: 'all 0.2s' }} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Case Spotlight Details Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Card Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '1px solid rgba(var(--accent-gold-rgb), 0.1)',
                  paddingBottom: '1.5rem',
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  {statesData[activeState].icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    {statesData[activeState].name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    {statesData[activeState].type}
                  </span>
                </div>
              </div>

              {/* Case Summary */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                  Case Matters & Defense:
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.65 }}>
                  {statesData[activeState].cases}
                </p>
              </div>

              {/* Rep Sectors */}
              <div>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                  Representative Industries & Sectors:
                </h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {statesData[activeState].sectors.map((sec) => (
                    <span
                      key={sec}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '6px',
                      }}
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA in panel */}
            <div style={{ marginTop: '2.5rem', borderTop: '1px solid rgba(var(--accent-gold-rgb), 0.05)', paddingTop: '1.5rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Do you have active GST litigation in {activeState}? Request a professional case evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .map-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
