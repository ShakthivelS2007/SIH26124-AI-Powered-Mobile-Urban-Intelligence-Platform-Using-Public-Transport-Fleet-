import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 3v5c0 4.5-3 8.3-7 9.5-4-1.2-7-5-7-9.5V6l7-3Z"
        stroke="#2563eb"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="#2563eb"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.success) {
      setError(result.error);
      return;
    }
    setError('');
    navigate('/dashboard');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#14151a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ display: 'inline-block' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#ffffff' }}>RoadWatch</div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)'
              }}
            >
              Fleet Defect Monitor
            </div>
          </Link>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: '#eef2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18
            }}
          >
            <ShieldIcon />
          </div>

          <h1 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 4px', color: '#14151a' }}>
            Municipal Authority Access
          </h1>
          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 24px', lineHeight: 1.5 }}>
            Sign in to access the fleet defect telemetry dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="officer@roadwatch.gov.in"
              autoFocus
              style={inputStyle(focusedField === 'email')}
            />

            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="••••••••"
              style={inputStyle(focusedField === 'password')}
            />

            {error && (
              <div
                style={{
                  fontSize: 12.5,
                  color: '#dc2626',
                  background: '#fdecec',
                  border: '1px solid #fca5a5',
                  borderRadius: 8,
                  padding: '8px 12px',
                  margin: '4px 0 12px'
                }}
              >
                {error}
              </div>
            )}

            <button type="submit" style={buttonStyle}>
              Sign In
            </button>
          </form>

          <p style={{ fontSize: 11.5, color: '#9ca3af', textAlign: 'center', margin: '18px 0 0' }}>
            Demo access - any email and password will work.
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: 12.5,
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6
};

function inputStyle(focused) {
  return {
    width: '100%',
    padding: '12px 14px',
    fontSize: 14,
    border: `1.5px solid ${focused ? '#2563eb' : '#e5e7eb'}`,
    borderRadius: 8,
    marginBottom: 16,
    outline: 'none',
    boxSizing: 'border-box',
    boxShadow: focused ? '0 0 0 3px rgba(37,99,235,0.15)' : 'none',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
  };
}

const buttonStyle = {
  width: '100%',
  padding: '13px',
  fontSize: 14.5,
  fontWeight: 600,
  color: '#ffffff',
  background: '#2563eb',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
};