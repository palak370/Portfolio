import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

/* Verified chamber location — the red-roof house (not the generic
   "Housing Board Colony" address string). Used by both the map embed
   and the Open in Maps destination. */
const OFFICE_LAT = 25.640452;
const OFFICE_LNG = 78.460805;

interface ContactProps {
  prefilledSubject?: string;
  prefilledMessage?: string;
}

export default function Contact({ prefilledSubject, prefilledMessage }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'GST Reply to Notice',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledSubject) {
      setFormData((prev) => ({ ...prev, subject: prefilledSubject }));
    }
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.subject;
      delete copy.message;
      return copy;
    });
  }, [prefilledSubject, prefilledMessage]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (10-12 digits)';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'GST Reply to Notice',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="section-padding" style={{ 
      position: 'relative',
      background: 'linear-gradient(rgba(251, 250, 247, 0.92), rgba(251, 250, 247, 0.96)), url("/images/bg_contact.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="bg-grid-pattern"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="section-header">
          <span className="section-subtitle">Consultation</span>
          <h2 className="section-title">Schedule a Legal Evaluation</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '1.05rem' }}>
            Submit your tax query or notice details. Advocate Shailendra Yadav will evaluate and respond within 24 hours.
          </p>
        </div>

        <div className="grid-2">
          {/* Left Column: Contact details & Location */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
              Chamber Info
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              For high-stakes appeals or complex audit responses, consultations can be scheduled at our primary office in Datia. We also host digital review sessions for out-of-state corporate clients.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', color: 'var(--accent-gold)', border: '1px solid var(--card-border)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700, fontFamily: "var(--font-sans)" }}>
                    Office Address
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.55 }}>
                    MIG 22, New Housing Board Colony,<br />
                    Jhansi Road, Datia (M.P.) - 475661, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', color: 'var(--accent-gold)', border: '1px solid var(--card-border)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700, fontFamily: "var(--font-sans)" }}>
                    Phone Consultation
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    <a href="tel:+919425123456" className="hover-gold" style={{ fontWeight: 600 }}>
                      +91-94251-23456
                    </a> (Advocate Office)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', color: 'var(--accent-gold)', border: '1px solid var(--card-border)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700, fontFamily: "var(--font-sans)" }}>
                    Email Correspondence
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    <a href="mailto:shailendrayadav.adv@gmail.com" className="hover-gold" style={{ fontWeight: 600 }}>
                      shailendrayadav.adv@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div 
              style={{ 
                marginTop: '1.5rem', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                border: '1px solid var(--card-border)',
                height: '240px',
                width: '100%',
                position: 'relative'
              }}
            >
              {/* Pin on the exact chamber building (verified coordinates, red-roof
                  house). Hybrid satellite view at high zoom so visitors recognise
                  the building itself — the office has no Business Profile yet, so
                  nearby labels may still read "Housing Board Colony". */}
              <iframe
                title="Advocate Shailendra Yadav Chamber Office Location Map"
                src={`https://maps.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&z=19&t=h&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Coordinate-based destination — not the colony address string */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${OFFICE_LAT},${OFFICE_LNG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                marginTop: '0.9rem',
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
              }}
            >
              <MapPin size={16} />
              Open in Maps
            </a>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="card" style={{ position: 'relative' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                <CheckCircle size={56} style={{ color: 'var(--accent-green)' }} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Submission Successful</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '350px' }}>
                  Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <strong>{formData.subject}</strong> has been logged. Advocate Shailendra Yadav will contact you shortly.
                </p>
                <button onClick={handleReset} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Full Name"
                    className="form-input"
                    style={{
                      borderColor: errors.name ? '#dc3545' : 'var(--card-border)'
                    }}
                  />
                  {errors.name && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.name}</span>}
                </div>

                {/* Email & Phone side-by-side */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}
                  className="form-row"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="form-input"
                      style={{
                        borderColor: errors.email ? '#dc3545' : 'var(--card-border)'
                      }}
                    />
                    {errors.email && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.email}</span>}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number *</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="94250XXXXX"
                      className="form-input"
                      style={{
                        borderColor: errors.phone ? '#dc3545' : 'var(--card-border)'
                      }}
                    />
                    {errors.phone && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.phone}</span>}
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Matter Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="form-input"
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <option value="GST Registration">GST Registration Inquiry</option>
                    <option value="GST Return Filing">GST Return Filing & Reconciliation</option>
                    <option value="GST Reply to Notice">GST Reply against Departmental Notices</option>
                    <option value="GST Appeals (HC/GSTAT)">GST Appeals (High Court & GSTAT)</option>
                    <option value="General Tax Consultation">General Tax & Corporate Consultation</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explain Notice or Matter *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your tax issue, SCN details, or corporate compliance needs here..."
                    className="form-input"
                    style={{
                      borderColor: errors.message ? '#dc3545' : 'var(--card-border)',
                      resize: 'none',
                      lineHeight: 1.5,
                    }}
                  />
                  {errors.message && <span style={{ color: '#dc3545', fontSize: '0.75rem' }}>{errors.message}</span>}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <Send size={16} />
                  Submit Case Details
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
