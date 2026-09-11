import Card from '../components/common/Card';
import { useLanguage } from '../context/LanguageContext';

export default function Settings() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card style={{ padding: 24 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Audio Settings</h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, marginBottom: 16 }}>
          Choose the language for the text-to-speech defect readout.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
          <label htmlFor="language-select" style={{ fontSize: 13, fontWeight: 600 }}>
            Voice Output Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-app-bg)',
              fontSize: 14,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="en-IN">English Voice</option>
            <option value="ta-IN">தமிழ் (Tamil) Voice</option>
          </select>
        </div>
      </Card>
    </div>
  );
}
