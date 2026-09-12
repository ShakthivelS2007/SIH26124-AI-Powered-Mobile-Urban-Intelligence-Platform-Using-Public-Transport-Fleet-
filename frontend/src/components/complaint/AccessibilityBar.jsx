import { useCitizenAccessibility } from '../../context/CitizenAccessibilityContext';
import { CITIZEN_LANGUAGES } from '../../utils/citizenTranslations';

export default function AccessibilityBar({ onSkipToContent }) {
  const { theme, toggleTheme, increaseFont, decreaseFont, resetFont, language, setLanguage, t } =
    useCitizenAccessibility();

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
        fontSize: 12.5,
        flexWrap: 'wrap',
        gap: 10
      }}
    >
      <button onClick={onSkipToContent} style={linkButtonStyle}>
        {t('skipToContent')}
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {CITIZEN_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              aria-label={`Switch to ${lang.label}`}
              aria-pressed={language === lang.code}
              style={langButtonStyle(language === lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />

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

        <button onClick={toggleTheme} aria-label="Toggle light/dark theme" style={linkButtonStyle}>
          {theme === 'dark' ? t('lightTheme') : t('darkTheme')}
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

function langButtonStyle(active) {
  return {
    background: active ? 'var(--citizen-accent, #3b82f6)' : 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: '#ffffff',
    fontWeight: 600,
    fontSize: 11.5,
    padding: '4px 9px',
    borderRadius: 5,
    cursor: 'pointer'
  };
}