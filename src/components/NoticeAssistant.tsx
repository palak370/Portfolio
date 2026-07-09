import { useState } from 'react';
import { AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NoticeItem {
  id: string;
  title: string;
  code: string;
  description: string;
  consequences: string;
  remedy: string;
  dropdownSubject: string;
  prefillMessage: string;
}

interface NoticeAssistantProps {
  onSelectNotice: (subject: string, message: string) => void;
}

export default function NoticeAssistant({ onSelectNotice }: NoticeAssistantProps) {
  const [selectedId, setSelectedId] = useState<string>('mismatch');
  const navigate = useNavigate();

  const notices: NoticeItem[] = [
    {
      id: 'mismatch',
      title: 'ITC Mismatch (2B vs 3B)',
      code: 'Section 16 / Rule 36(4)',
      description: 'Departmental discrepancy letter claiming you claimed excess Input Tax Credit (ITC) in GSTR-3B compared to what vendors uploaded in GSTR-2B.',
      consequences: 'Reversal of claimed credit, imposition of 18% - 24% interest, and potential penalty demands.',
      remedy: 'Detailed transaction reconciliation, verifying invoice uploading by suppliers, and submitting a structured response to departmental officers.',
      dropdownSubject: 'GST Return Filing',
      prefillMessage: 'Dear Advocate Yadav,\nI have received a GST notice regarding an ITC mismatch between GSTR-2B and GSTR-3B under Section 16. I need a comprehensive reconciliation analysis and help drafting a response.',
    },
    {
      id: 'scrutiny',
      title: 'Returns Scrutiny',
      code: 'Section 61 / Form ASMT-10',
      description: 'Notice in Form ASMT-10 pointing out discrepancies in turnovers, tax rates, or returns scrutiny by departmental officers.',
      consequences: 'If unresolved, it leads to audit proceedings under Section 65 or demand notice under Section 73/74.',
      remedy: 'Replying within 30 days in Form ASMT-11, presenting clean ledger accounts, reconciliations, and explaining tax computations.',
      dropdownSubject: 'GST Reply to Notice',
      prefillMessage: 'Dear Advocate Yadav,\nI have received Form ASMT-10 Notice under Section 61 for Returns Scrutiny. I need professional assistance in drafting the Form ASMT-11 reply within the 30-day window.',
    },
    {
      id: 'blocked',
      title: 'Blocked Credit Disputes',
      code: 'Section 17(5) Reversals',
      description: 'Ineligible credit disputes where the department blocks or demands reversal of credit claimed on motor vehicles, real estate construction inputs, or catering.',
      consequences: 'Sudden blocking of electronic credit ledgers and demand for recovery of used credits with interest.',
      remedy: 'Filing legal replies asserting eligibility exceptions (e.g. subcontractors, transport businesses) or filing a Writ Petition in High Court for arbitrary blocks.',
      dropdownSubject: 'GST Appeals (HC/GSTAT)',
      prefillMessage: 'Dear Advocate Yadav,\nThe GST department has blocked my Electronic Credit Ledger claiming ineligible credit under Section 17(5). I need to appeal this block and file a legal representation.',
    },
    {
      id: 'audit',
      title: 'Summons & GST Audits',
      code: 'Section 65 / Section 70',
      description: 'Departmental audit notifications demanding comprehensive books of accounts, or summons demanding presence of directors/proprietors.',
      consequences: 'High risk of demand escalation, seizure threats, and severe penal actions if statements are recorded incorrectly.',
      remedy: 'Pre-audit health checks to detect leaks, drafting legal replies to questionnaires, and representing directors during statement recording.',
      dropdownSubject: 'GST Reply to Notice',
      prefillMessage: 'Dear Advocate Yadav,\nWe have received a GST Audit notice under Section 65 and a summon to produce accounting ledgers under Section 70. We request a pre-audit evaluation and defense counsel representation.',
    },
  ];

  const activeNotice = notices.find((n) => n.id === selectedId) || notices[0];

  const handleApply = () => {
    onSelectNotice(activeNotice.dropdownSubject, activeNotice.prefillMessage);
    navigate('/contact');
  };

  return (
    <section id="notice-assistant" className="section-padding" style={{ position: 'relative' }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Self-Help Tool</span>
          <h2 className="section-title">GST Notice Assistant</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            Select your GST issue below to evaluate compliance risks and prepare a defense response.
          </p>
        </div>

        {/* Assistant Main Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.8fr',
            gap: '3rem',
            alignItems: 'stretch'
          }}
          className="assistant-grid"
        >
          {/* Left Column: Notice Types */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {notices.map((n) => {
              const isActive = n.id === selectedId;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedId(n.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem 1.75rem',
                    borderRadius: 'var(--border-radius)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    outline: 'none',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-gold)' : 'var(--card-border)',
                    backgroundColor: isActive ? 'rgba(var(--accent-gold-rgb), 0.08)' : 'var(--card-bg)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'rgba(var(--accent-gold-rgb), 0.35)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--card-border)';
                    }
                  }}
                >
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em', 
                    marginBottom: '0.35rem' 
                  }}>
                    {n.code}
                  </span>
                  <span style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: 600, 
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sans)'
                  }}>
                    {n.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Risk & Defense Panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--accent-gold)' }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(var(--accent-gold-rgb), 0.1)', paddingBottom: '1rem' }}>
                <AlertCircle size={22} style={{ color: 'var(--accent-gold)' }} />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Notice Evaluation</h3>
              </div>

              {/* Problem Description */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                  Discrepancy Description:
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                  {activeNotice.description}
                </p>
              </div>

              {/* Consequences */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                  Risk / Penalty exposure:
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.55 }}>
                  {activeNotice.consequences}
                </p>
              </div>

              {/* Recommended Defense */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontFamily: "var(--font-sans)", fontWeight: 700 }}>
                  Suggested Defense Action:
                </h4>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '0.15rem' }} />
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.55, fontWeight: 600 }}>
                    {activeNotice.remedy}
                  </p>
                </div>
              </div>
            </div>

            {/* Autofill Call to Action */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(var(--accent-gold-rgb), 0.05)', paddingTop: '1.5rem' }}>
              <button
                onClick={handleApply}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Autofill Notice Details in Consultation Form
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .assistant-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
