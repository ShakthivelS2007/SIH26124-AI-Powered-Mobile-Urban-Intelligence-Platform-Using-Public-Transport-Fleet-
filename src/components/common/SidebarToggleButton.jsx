export default function SidebarToggleButton({ isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Hide navigation' : 'Show navigation'}
      aria-expanded={isOpen}
      style={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        background: 'var(--color-surface)',
        cursor: 'pointer'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6h16M4 12h16M4 18h16"
          stroke="var(--color-text-primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
