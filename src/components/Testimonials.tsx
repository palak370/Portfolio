import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  location: string;
  stars: number;
}

export default function Testimonials() {
  const testimonials: TestimonialItem[] = [
    {
      quote: "The GST department blocked our input tax credit under Section 17(5) claiming ineligible machinery purchases. Advocate Shailendra Yadav represented us, presented clear commercial justifications, and got the credit unblocked in 2 weeks. Exceptional legal logic.",
      name: "Ritesh Deshmukh",
      role: "Managing Director",
      company: "Apex Metal Industries",
      location: "Pune, Maharashtra",
      stars: 5,
    },
    {
      quote: "We received an ASMT-10 return scrutiny notice demanding Rs 42 Lakhs discrepancy for FY 2021-22. Shailendra Sir designed our ASMT-11 defense draft and presented ledger reconciliations that closed the case without any recovery demands.",
      name: "S. K. Dwivedi",
      role: "CFO",
      company: "Indore Agro Products",
      location: "Indore, Madhya Pradesh",
      stars: 5,
    },
    {
      quote: "Excellent in handling tax summons and preparing files for the GSTAT tribunal. His representation during departmental audit inquiries saved us from arbitrary interest claims. Very professional and accessible.",
      name: "Neha Singhal",
      role: "Director of Taxes",
      company: "Universal Logistics Group",
      location: "New Delhi",
      stars: 5,
    },
    {
      quote: "Our ancestral dealership received a mismatch notice on GSTR-2B vs 3B. Adv. Yadav's office mapped every vendor invoice, identified supplier compliance defaults, and drafted a flawless reply protecting our input credits.",
      name: "Vikas Agrawal",
      role: "Proprietor",
      company: "Agrawal Enterprises",
      location: "Gwalior, Madhya Pradesh",
      stars: 5,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      triggerFade(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const triggerFade = (callback: () => void) => {
    setIsFading(true);
    setTimeout(() => {
      callback();
      setIsFading(false);
    }, 300);
  };

  const handlePrev = () => {
    triggerFade(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  };

  const handleNext = () => {
    triggerFade(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    });
  };

  return (
    <section id="testimonials" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="bg-grid-pattern"></div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="section-header">
          <span className="section-subtitle">Reviews</span>
          <h2 className="section-title">Client Testimonials</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            Proven results and courtroom success stories from commercial leaders.
          </p>
        </div>

        {/* Carousel Slider */}
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
          {/* Main Card */}
          <div
            className="card glow-card"
            style={{
              padding: 'clamp(1.5rem, 4vw, 3.5rem)',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem',
              position: 'relative',
              borderRadius: 'var(--border-radius)',
              opacity: isFading ? 0 : 1,
              transform: isFading ? 'translateY(5px)' : 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {/* Quote Icon Background */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '2.5rem', opacity: 0.04, color: 'var(--accent-gold)' }}>
              <Quote size={90} />
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[...Array(testimonials[activeIndex].stars)].map((_, i) => (
                <Star key={i} size={15} fill="var(--accent-gold)" style={{ color: 'var(--accent-gold)' }} />
              ))}
            </div>

            {/* Quote Text */}
            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-primary)',
                lineHeight: 1.75,
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              "{testimonials[activeIndex].quote}"
            </p>

            {/* Client Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(var(--accent-gold-rgb), 0.08)', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 700, fontFamily: "var(--font-sans)" }}>
                  {testimonials[activeIndex].name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {testimonials[activeIndex].role}, <strong style={{ color: 'var(--accent-gold)' }}>{testimonials[activeIndex].company}</strong>
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {testimonials[activeIndex].location}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            {/* Dots indicators */}
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerFade(() => setActiveIndex(idx))}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: idx === activeIndex ? 'var(--accent-gold)' : 'var(--card-border)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handlePrev}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
