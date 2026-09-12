import { useState } from 'react';

function formatAadhaar(value) {
  const digits = value.replace(/\D/g, '').slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function maskAadhaar(digits) {
  return `XXXX XXXX ${digits.slice(-4)}`;
}

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3Z"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeptIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 3 7v2h18V7l-9-5Z"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PotholeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 15c2-1 3-3 5-3s3 2.5 5 2.5 3-2.5 6-1"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M3 19h18" stroke="var(--citizen-accent)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ClockCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="var(--citizen-success-text)" strokeWidth="1.6" />
      <path
        d="M9 12.5l2 2 4-4.5"
        stroke="var(--citizen-success-text)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BusFleetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="10" rx="2" stroke="var(--citizen-accent)" strokeWidth="1.6" />
      <circle cx="8" cy="18" r="1.6" stroke="var(--citizen-accent)" strokeWidth="1.6" />
      <circle cx="16" cy="18" r="1.6" stroke="var(--citizen-accent)" strokeWidth="1.6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="var(--citizen-success-text)" strokeWidth="1.7" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="var(--citizen-success-text)" strokeWidth="1.7" />
    </svg>
  );
}

function PinOffIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-6.6 7-12a7 7 0 1 0-14 0c0 5.4 7 12 7 12Z"
        stroke="var(--citizen-accent)"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9" r="2.2" stroke="var(--citizen-accent)" strokeWidth="1.6" />
    </svg>
  );
}

export default function AadhaarLogin({ onSuccess }) {
  const [step, setStep] = useState('aadhaar'); // 'aadhaar' | 'otp'
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const aadhaarDigits = aadhaarInput.replace(/\D/g, '');

  function handleSendOtp(e) {
    e.preventDefault();
    if (aadhaarDigits.length !== 12) {
      setError('Enter a valid 12-digit Aadhaar number.');
      return;
    }
    setError('');
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setStep('otp');
  }

  function handleResendOtp() {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otp);
    setOtpInput('');
    setError('');
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    if (otpInput !== generatedOtp) {
      setError('Incorrect OTP. Please try again.');
      return;
    }
    setError('');
    onSuccess(aadhaarDigits);
  }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 40px)',
        background: 'var(--citizen-bg-gradient)',
        display: 'flex',
        flexWrap: 'wrap'
      }}
    >
      {/* Left column: informational / trust content */}
      <div
        style={{
          flex: '1 1 480px',
          padding: '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              color: 'var(--citizen-accent)'
            }}
          >
            <DeptIcon /> Dept. of Public Works &amp; Urban Infrastructure
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--citizen-success-text)',
              background: 'var(--citizen-success-bg)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--citizen-success-text)' }} />
            Smart City Safety Mission
          </span>
        </div>

        <h1
          style={{
            fontSize: 38,
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'var(--citizen-text-primary)',
            margin: '0 0 16px',
            maxWidth: 520
          }}
        >
          Fast, Accountable Citizen Road Defect Redressal.
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--citizen-text-secondary)',
            margin: '0 0 32px',
            maxWidth: 500
          }}
        >
          Empowering verified residents to report potholes, missing signage, and hazardous road
          conditions directly to municipal dispatch units, alongside the same live detections
          gathered by the city bus fleet.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
          <StatCard icon={<PotholeIcon />} label="Reported This Year" value="14,820+" subtext="Defects logged" />
          <StatCard icon={<ClockCheckIcon />} label="SLA Met" value="98.2%" subtext="Under 48h turnaround" valueColor="var(--citizen-success-text)" />
          <StatCard icon={<BusFleetIcon />} label="AI Bus Fleets" value="340+" subtext="Edge-vision units" />
        </div>

        <div
          style={{
            background: 'var(--citizen-surface)',
            border: '1px solid var(--citizen-border)',
            borderRadius: 14,
            padding: 18,
            maxWidth: 500
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: 'var(--citizen-accent-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PinOffIcon />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--citizen-text-primary)' }}>
              UIDAI Stamped &amp; Encrypted
            </span>
          </div>
          <p
            style={{
              fontSize: 12.5,
              lineHeight: 1.6,
              color: 'var(--citizen-text-secondary)',
              margin: '0 0 12px'
            }}
          >
            Aadhaar details are authenticated through the UIDAI-linked OTP gateway. Raw 12-digit
            numbers are never retained on RoadWatch servers.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11.5, fontWeight: 600 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--citizen-text-secondary)' }}>
              <LockIcon /> 256-bit TLS End-to-End
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--citizen-text-secondary)' }}>
              <PinOffIcon /> Zero Local Retention
            </span>
          </div>
        </div>
      </div>

      {/* Right column: login form */}
      <div
        style={{
          flex: '1 1 380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            background: 'var(--citizen-surface)',
            border: '1px solid var(--citizen-border)',
            borderRadius: 20,
            boxShadow: '0 12px 32px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(15, 23, 42, 0.05)',
            padding: 36
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'var(--citizen-accent-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}
          >
            <ShieldIcon />
          </div>

          <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 6px', color: 'var(--citizen-text-primary)' }}>
            Citizen Complaint Portal
          </h2>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--citizen-text-secondary)', margin: '0 0 28px' }}>
            Log in with your Aadhaar-linked mobile number to report a road defect.
          </p>

          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            <StepDot active />
            <StepDot active={step === 'otp'} />
          </div>

          {step === 'aadhaar' && (
            <form onSubmit={handleSendOtp}>
              <FieldLabel>Aadhaar Number</FieldLabel>
              <input
                type="text"
                inputMode="numeric"
                value={aadhaarInput}
                onChange={(e) => setAadhaarInput(formatAadhaar(e.target.value))}
                onFocus={() => setFocusedField('aadhaar')}
                onBlur={() => setFocusedField(null)}
                placeholder="XXXX XXXX XXXX"
                autoFocus
                style={inputStyle(focusedField === 'aadhaar')}
              />
              {error && <ErrorBanner>{error}</ErrorBanner>}
              <button type="submit" style={buttonStyle}>
                Send OTP
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <p style={{ fontSize: 13, color: 'var(--citizen-text-primary)', margin: '0 0 16px', lineHeight: 1.6 }}>
                OTP sent to the mobile number linked with Aadhaar{' '}
                <strong>{maskAadhaar(aadhaarDigits)}</strong>.
              </p>

              {/* Demo-only: showing the OTP directly since there's no real SMS gateway */}
              <div
                style={{
                  background: 'var(--citizen-accent-bg)',
                  color: 'var(--citizen-accent)',
                  borderRadius: 10,
                  padding: '12px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>Demo OTP: {generatedOtp}</span>
                <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.6, letterSpacing: 0.4 }}>
                  DEMO ONLY
                </span>
              </div>

              <FieldLabel>Enter OTP</FieldLabel>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                onFocus={() => setFocusedField('otp')}
                onBlur={() => setFocusedField(null)}
                placeholder="6-digit OTP"
                autoFocus
                style={{ ...inputStyle(focusedField === 'otp'), letterSpacing: 4, fontSize: 18 }}
              />
              {error && <ErrorBanner>{error}</ErrorBanner>}
              <button type="submit" style={buttonStyle}>
                Verify &amp; Continue
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 12.5 }}>
                <button
                  type="button"
                  onClick={() => {
                    setStep('aadhaar');
                    setOtpInput('');
                    setError('');
                  }}
                  style={linkButtonStyle}
                >
                  &larr; Change number
                </button>
                <button type="button" onClick={handleResendOtp} style={linkButtonStyle}>
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
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

function StepDot({ active }) {
  return (
    <div
      style={{
        flex: 1,
        height: 3,
        borderRadius: 2,
        background: active ? 'var(--citizen-accent)' : 'var(--citizen-border)',
        transition: 'background 0.2s ease'
      }}
    />
  );
}

function FieldLabel({ children }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: 12.5,
        fontWeight: 600,
        color: 'var(--citizen-text-primary)',
        marginBottom: 6
      }}
    >
      {children}
    </label>
  );
}

function ErrorBanner({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12.5,
        color: 'var(--citizen-danger-text)',
        background: 'var(--citizen-danger-bg)',
        border: '1px solid var(--citizen-danger-text)',
        borderRadius: 8,
        padding: '8px 12px',
        margin: '4px 0 12px'
      }}
    >
      {children}
    </div>
  );
}

function inputStyle(focused) {
  return {
    width: '100%',
    padding: '13px 14px',
    fontSize: 15,
    letterSpacing: 1,
    border: `1.5px solid ${focused ? 'var(--citizen-accent)' : 'var(--citizen-border)'}`,
    borderRadius: 10,
    marginBottom: 8,
    outline: 'none',
    boxSizing: 'border-box',
    background: 'var(--citizen-input-bg)',
    color: 'var(--citizen-text-primary)',
    boxShadow: focused ? '0 0 0 3px rgba(59, 130, 246, 0.18)' : 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
  };
}

const buttonStyle = {
  width: '100%',
  padding: '14px',
  fontSize: 14.5,
  fontWeight: 600,
  color: '#ffffff',
  background: 'var(--citizen-accent)',
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  marginTop: 10,
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--citizen-text-secondary)',
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0
};