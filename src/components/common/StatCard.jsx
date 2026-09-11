import Card from './Card';

export default function StatCard({ label, value, subtext, accentColor, accentBg, live }) {
  return (
    <Card
      style={{
        padding: 16,
        flex: 1,
        minWidth: 160,
        background: accentBg ?? 'var(--color-surface)'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
          color: accentColor ?? 'var(--color-text-secondary)',
          marginBottom: 8
        }}
      >
        {label}
        {live && (
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-status-red)',
              animation: 'pulse-dot 1.4s infinite'
            }}
          />
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)' }}>
        {value}
      </div>
      {subtext && (
        <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
          {subtext}
        </div>
      )}
    </Card>
  );
}