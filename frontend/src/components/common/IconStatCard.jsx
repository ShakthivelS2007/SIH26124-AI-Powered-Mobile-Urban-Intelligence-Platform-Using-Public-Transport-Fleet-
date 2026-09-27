import Card from './Card';

function faintBg(hex, alpha = 0.12) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


export default function IconStatCard({ icon, color, bg, label, value, trend, placeholder }) {
  return (
    <Card style={{ padding: 16, flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 10, background: bg?? faintBg(color) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          {label}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text-primary)' }}>
          {placeholder ? '—' : value}
        </span>
        {!placeholder && trend && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: trend.direction === 'up' ? 'var(--color-status-red)' : 'var(--color-status-green)'
            }}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {trend.percent}%
          </span>
        )}
      </div>

      {placeholder && (
        <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>Not yet integrated</span>
      )}
    </Card>
  );
}