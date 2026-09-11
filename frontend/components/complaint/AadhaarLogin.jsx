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
        stroke="var(--color-citizen-accent)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="var(--color-citizen-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #eff6ff 0%, #f8fafc 100%)',
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
          background: '#ffffff',
          border: '1px solid var(--color-citizen-border)',
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
            background: 'var(--color-citizen-accent-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}
        >
          <ShieldIcon />
        </div>

        <h1 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 6px', color: '#0f172a' }}>
          Citizen Complaint Portal
        </h1>
        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#64748b', margin: '0 0 28px' }}>
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
            <p style={{ fontSize: 13, color: '#334155', margin: '0 0 16px', lineHeight: 1.6 }}>
              OTP sent to the mobile number linked with Aadhaar{' '}
              <strong>{maskAadhaar(aadhaarDigits)}</strong>.
            </p>

            {/* Demo-only: showing the OTP directly since there's no real SMS gateway */}
            <div
              style={{
                background: 'var(--color-citizen-accent-bg)',
                color: 'var(--color-citizen-accent)',
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

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 14,
                fontSize: 12.5
              }}
            >
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
  );
}

function StepDot({ active }) {
  return (
    <div
      style={{
        flex: 1,
        height: 3,
        borderRadius: 2,
        background: active ? 'var(--color-citizen-accent)' : 'var(--color-citizen-border)',
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
        color: '#334155',
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
        color: '#dc2626',
        background: '#fef2f2',
        border: '1px solid #fecaca',
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
    border: `1.5px solid ${focused ? 'var(--color-citizen-accent)' : 'var(--color-citizen-border)'}`,
    borderRadius: 10,
    marginBottom: 8,
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: focused ? '0 0 0 3px rgba(37, 99, 235, 0.12)' : 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
  };
}

const buttonStyle = {
  width: '100%',
  padding: '14px',
  fontSize: 14.5,
  fontWeight: 600,
  color: '#ffffff',
  background: 'var(--color-citizen-accent)',
  border: 'none',
  borderRadius: 10,
  cursor: 'pointer',
  marginTop: 10,
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#64748b',
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0
};