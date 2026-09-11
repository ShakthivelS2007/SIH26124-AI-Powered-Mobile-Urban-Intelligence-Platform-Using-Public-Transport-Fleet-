export default function Card({ children, style, ...props }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
