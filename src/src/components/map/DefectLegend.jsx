import { getDefectMeta } from '../../theme/tokens';

export default function DefectLegend({ types }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {types.map((type) => {
        const meta = getDefectMeta(type);
        return (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: meta.color,
                display: 'inline-block'
              }}
            />
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              {meta.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
