import SidebarToggleButton from '../components/common/SidebarToggleButton';
import { useBusIdSearch } from '../context/SearchContext';

export default function Topbar({ title, isSidebarOpen, onToggleSidebar, showSearch }) {
  const { busIdQuery, setBusIdQuery } = useBusIdSearch();

  return (
    <header
      style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 20px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0
      }}
    >
      <SidebarToggleButton isOpen={isSidebarOpen} onToggle={onToggleSidebar} />
      <h1 style={{ fontSize: 16, fontWeight: 700, margin: 0, whiteSpace: 'nowrap' }}>{title}</h1>

      {showSearch && (
        <div style={{ flex: 1, maxWidth: 320, marginLeft: 12 }}>
          <input
            type="text"
            value={busIdQuery}
            onChange={(e) => setBusIdQuery(e.target.value)}
            placeholder="Search by Bus ID..."
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid var(--color-border)',
              background: 'var(--color-app-bg)',
              fontSize: 13,
              outline: 'none'
            }}
          />
        </div>
      )}
    </header>
  );
}
