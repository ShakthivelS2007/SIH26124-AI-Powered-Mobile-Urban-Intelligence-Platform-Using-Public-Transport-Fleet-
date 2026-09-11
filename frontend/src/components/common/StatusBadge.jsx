import { getDefectMeta, getDefectDisplayLabel } from '../../theme/tokens';

export default function StatusBadge({ defect }) {
  const meta = getDefectMeta(defect.type);
  const label = getDefectDisplayLabel(defect);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 'var(--radius-pill)',
        background: meta.bg,
        color: meta.color,
        fontSize: 13,
        fontWeight: 600
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: meta.color
        }}
      />
      {label}
    </span>
  );
}