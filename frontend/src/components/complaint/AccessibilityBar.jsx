import { useCitizenAccessibility } from '../../context/CitizenAccessibilityContext';

export default function AccessibilityBar({ onSkipToContent }) {
  const { theme, toggleTheme, increaseFont, decreaseFont, resetFont } = useCitizenAccessibility();

  return (
    <div
      style={{
        width: '100%',
        background: '#0b1220',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        fontSize: 12.5
      }}
    >
      <button onClick={onSkipToContent} style={linkButtonStyle}>
        Skip to content
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={decreaseFont} aria-label="Decrease text size" style={fontButtonStyle}>
            A-
          </button>
          <button onClick={resetFont} aria-label="Default text size" style={fontButtonStyle}>
            A
          </button>
          <button onClick={increaseFont} aria-label="Increase text size" style={fontButtonStyle}>
            A+
          </button>
        </div>

        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />

        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark theme"
          style={linkButtonStyle}
        >
          {theme === 'dark' ? '☀️ Light theme' : '🌙 Dark theme'}
        </button>
      </div>
    </div>
  );
}

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'rgba(255,255,255,0.75)',
  fontWeight: 600,
  cursor: 'pointer',
  padding: 0,
  fontSize: 12.5
};

const fontButtonStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#ffffff',
  fontWeight: 700,
  fontSize: 12,
  width: 26,
  height: 24,
  borderRadius: 5,
  cursor: 'pointer'
};