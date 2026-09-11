import { useNavigate } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { speak, buildDefectSpeech } from '../../utils/textToSpeech';
import { useLanguage } from '../../context/LanguageContext';

export default function DefectRow({ defect }) {
  const navigate = useNavigate();
  const { language }  = useLanguage();

  function handleSpeak(e) {
    e.stopPropagation();
    const textToRead = buildDefectSpeech(defect);
    speak(textToRead, language);
  }

  return (
    <tr
      onClick={() => navigate(`/defect/${defect.id}`)}
      style={{ cursor: 'pointer' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-app-bg)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <td style={cellStyle}>{defect.bus_id}</td>
      <td style={cellStyle}>
        <StatusBadge defect={defect} />
      </td>
      <td style={cellStyle}>{defect.location ?? '—'}</td>
      <td style={cellStyle}>{defect.nearest_landmark ?? '—'}</td>
      <td style={cellStyle}>{new Date(defect.timestamp).toLocaleString()}</td>
      <td style={{ ...cellStyle, textAlign: 'right' }}>
        <button
          onClick={handleSpeak}
          aria-label="Read defect aloud"
          title="Read aloud"
          style={{
            width: 32,
            height: 32,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            background: 'var(--color-surface)',
            cursor: 'pointer'
          }}
        >
          🔊
        </button>
      </td>
    </tr>
  );
}

const cellStyle = {
  padding: '12px',
  borderBottom: '1px solid var(--color-border)'
};