import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AadhaarLogin from '../components/complaint/AadhaarLogin';
import ComplaintForm from '../components/complaint/ComplaintForm';
import AccessibilityBar from '../components/complaint/AccessibilityBar';
import {
  CitizenAccessibilityProvider,
  useCitizenAccessibility
} from '../context/CitizenAccessibilityContext';

function RoadPinIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
      />
      <path
        d="M9 9.5h6M9 12h4"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="var(--citizen-success-text)" strokeWidth="1.6" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="var(--citizen-success-text)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="var(--citizen-success-text)" strokeWidth="1.8" />
      <path
        d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        stroke="var(--citizen-success-text)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        stroke="var(--citizen-text-secondary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17l5-5-5-5M21 12H9"
        stroke="var(--citizen-text-secondary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ComplaintPortalInner() {
  const [aadhaarDigits, setAadhaarDigits] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const { theme, fontScale } = useCitizenAccessibility();

  function handleLoginSuccess(digits) {
    setAadhaarDigits(digits);
  }

  function handleLogout() {
    setAadhaarDigits(null);
    setSubmitted(false);
  }

  function handleScrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div data-citizen-theme={theme} style={{ zoom: fontScale }}>
      <AccessibilityBar onSkipToContent={handleScrollToForm} />

      {!aadhaarDigits ? (
        <AadhaarLogin onSuccess={handleLoginSuccess} />
      ) : (
        <div style={{ minHeight: '100vh', background: 'var(--citizen-bg-gradient)' }}>
          <header
            style={{
              height: 76,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 28px',
              background: 'var(--citizen-surface)',
              borderBottom: '1px solid var(--citizen-border)',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}
          >
            <Link to="/" style={{ display: 'block' }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: 'var(--citizen-text-primary)',
                  lineHeight: 1.2,
                  letterSpacing: 0.3
                }}
              >
                RoadWatch
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.6,
                  textTransform: 'uppercase',
                  color: 'var(--citizen-text-secondary)'
                }}
              >
                Citizen Road Safety &amp; Complaint Portal
              </div>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--citizen-success-text)',
                  background: 'var(--citizen-success-bg)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)'
                }}
              >
                <UserIcon />
                Verified: {`XXXX XXXX ${aadhaarDigits.slice(-4)}`}
              </div>

              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--citizen-text-secondary)',
                  background: 'var(--citizen-bg-gradient)',
                  border: '1px solid var(--citizen-border)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer'
                }}
              >
                <LogoutIcon />
                Logout
              </button>
            </div>
          </header>

          {!submitted && (
            <section
              style={{
                minHeight: 'calc(100vh - 76px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                textAlign: 'center',
                maxWidth: 640,
                margin: '0 auto'
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: 'var(--citizen-accent-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24
                }}
              >
                <RoadPinIcon />
              </div>

              <span
                style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--citizen-surface)',
                  border: '1px solid var(--citizen-border)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                  color: 'var(--citizen-accent)',
                  marginBottom: 16
                }}
              >
                Connected to Municipal Dashboard
              </span>

              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--citizen-text-primary)',
                  margin: '0 0 16px'
                }}
              >
                Report a Road Defect
              </h1>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: 'var(--citizen-text-secondary)',
                  margin: '0 0 32px'
                }}
              >
                Spot a pothole, waterlogged stretch, missing sign, or damaged crossing?
                Complaints submitted here go directly to the municipal RoadWatch dashboard,
                alongside detections from the city bus fleet, so repair teams can act on them.
              </p>
              <button
                onClick={handleScrollToForm}
                style={{
                  padding: '15px 34px',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#ffffff',
                  background: 'var(--citizen-accent)',
                  border: 'none',
                  borderRadius: 10,
                  cursor: 'pointer',
                  boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)'
                }}
              >
                Enter Complaint
              </button>

              <div
                style={{
                  display: 'flex',
                  gap: 28,
                  marginTop: 48,
                  color: 'var(--citizen-text-secondary)',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                <span>📷 Photo Required</span>
                <span>📍 Auto Geotagged</span>
                <span>⚡ Instant Routing</span>
              </div>
            </section>
          )}

          <div ref={formRef} style={{ padding: submitted ? '80px 20px' : '0 20px 80px' }}>
            {submitted ? (
              <div
                style={{
                  textAlign: 'center',
                  maxWidth: 480,
                  margin: '0 auto',
                  background: 'var(--citizen-surface)',
                  border: '1px solid var(--citizen-border)',
                  borderRadius: 20,
                  boxShadow: '0 12px 32px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(15, 23, 42, 0.05)',
                  padding: 44
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'var(--citizen-success-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px'
                  }}
                >
                  <CheckCircleIcon />
                </div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--citizen-text-primary)',
                    margin: '0 0 8px'
                  }}
                >
                  Thank you for being a proper citizen
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--citizen-text-secondary)',
                    margin: '0 0 28px'
                  }}
                >
                  Your complaint has been forwarded to the municipal dashboard for review.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    padding: '13px 26px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--citizen-accent)',
                    background: 'var(--citizen-accent-bg)',
                    border: 'none',
                    borderRadius: 10,
                    cursor: 'pointer'
                  }}
                >
                  Submit Another Complaint
                </button>
              </div>
            ) : (
              <div
                style={{
                  maxWidth: 560,
                  margin: '0 auto',
                  background: 'var(--citizen-surface)',
                  border: '1px solid var(--citizen-border)',
                  borderRadius: 20,
                  boxShadow: '0 12px 32px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(15, 23, 42, 0.05)',
                  padding: 36
                }}
              >
                <ComplaintForm
                  aadhaarDigits={aadhaarDigits}
                  onSubmitted={() => setSubmitted(true)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComplaintPortal() {
  return (
    <CitizenAccessibilityProvider>
      <ComplaintPortalInner />
    </CitizenAccessibilityProvider>
  );
}