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

function SnapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="3.2" stroke="#ffffff" strokeWidth="1.6" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth="1.6" />
      <path
        d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#ffffff" strokeWidth="1.6" />
      <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="#ffffff" strokeWidth="1.6" />
      <rect x="13" y="10" width="8" height="11" rx="1.5" stroke="#ffffff" strokeWidth="1.6" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#ffffff" strokeWidth="1.6" />
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

function WorkflowStep({ number, icon, title, description }) {
  return (
    <div
      style={{
        background: 'var(--citizen-surface)',
        border: '1px solid var(--citizen-border)',
        borderRadius: 14,
        padding: 20
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 16
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: 'var(--citizen-accent)',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {number}
        </span>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'var(--citizen-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </div>
      </div>

      <h3
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--citizen-text-primary)',
          margin: '0 0 8px',
          textAlign: 'center'
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: 'var(--citizen-text-secondary)',
          margin: 0,
          textAlign: 'center'
        }}
      >
        {description}
      </p>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, valueColor }) {
  return (
    <div
      style={{
        background: 'var(--citizen-surface)',
        border: '1px solid var(--citizen-border)',
        borderRadius: 12,
        padding: 14,
        flex: '1 1 140px',
        minWidth: 140
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            color: 'var(--citizen-text-secondary)'
          }}
        >
          {label}
        </span>
        {icon}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: valueColor ?? 'var(--citizen-text-primary)' }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: 'var(--citizen-text-secondary)', marginTop: 2 }}>{subtext}</div>
    </div>
  );
}

function ComplaintPortalInner() {
  const [aadhaarDigits, setAadhaarDigits] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const { theme, fontScale, t } = useCitizenAccessibility();

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
                {t('portalTitle')}
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
                {t('portalSubtitle')}
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
                {t('verifiedLabel')}: {`XXXX XXXX ${aadhaarDigits.slice(-4)}`}
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
                {t('logout')}
              </button>
            </div>
          </header>

          {!submitted && (
            <section
              style={{
                minHeight: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px 20px',
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
                {t('connectedBadge')}
              </span>

              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--citizen-text-primary)',
                  margin: '0 0 16px'
                }}
              >
                {t('reportTitle')}
              </h1>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: 'var(--citizen-text-secondary)',
                  margin: '0 0 32px'
                }}
              >
                {t('reportDescription')}
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
                {t('enterComplaint')}
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
                <span>📷 {t('photoRequired')}</span>
                <span>📍 {t('autoGeotagged')}</span>
                <span>⚡ {t('instantRouting')}</span>
              </div>
            </section>
          )}

          {!submitted && (
            <section style={{ padding: '0px 20px 60px' }}>
              <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--citizen-accent-bg)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                    color: 'var(--citizen-accent)',
                    marginBottom: 14
                  }}
                >
                  {t('workflowBadge')}
                </span>

                <h2
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: 'var(--citizen-text-primary)',
                    margin: '0 0 8px'
                  }}
                >
                  {t('workflowTitle')}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--citizen-text-secondary)',
                    margin: '0 0 32px'
                  }}
                >
                  {t('workflowSubtitle')}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 20,
                    textAlign: 'left'
                  }}
                >
                  <WorkflowStep
                    number={1}
                    icon={<SnapIcon />}
                    title={t('step1Title')}
                    description={t('step1Description')}
                  />
                  <WorkflowStep
                    number={2}
                    icon={<GearIcon />}
                    title={t('step2Title')}
                    description={t('step2Description')}
                  />
                  <WorkflowStep
                    number={3}
                    icon={<DashboardIcon />}
                    title={t('step3Title')}
                    description={t('step3Description')}
                  />
                </div>
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
                  {t('thankYouTitle')}
                </h2>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--citizen-text-secondary)',
                    margin: '0 0 28px'
                  }}
                >
                  {t('thankYouDescription')}
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
                  {t('submitAnother')}
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