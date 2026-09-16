import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAutoVoice } from '../context/AutoVoiceContext';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reports', label: 'Reports' },
  { to: '/settings', label: 'Settings' }
];


export default function Sidebar({ isOpen }) {
  return (
    <aside
      style={{
        width: isOpen ? 'var(--sidebar-width)' : 'var(--sidebar-width-collapsed)',
        overflow: 'hidden',
        background: 'var(--color-sidebar-bg)',
        transition: 'width 0.2s ease',
        flexShrink: 0,
        height: '100%'
      }}
    >
      <div style={{ width: 'var(--sidebar-width)', padding: '24px 16px' }}>
        <Link to="/" style={{ display: 'block', padding: '0 8px', marginBottom: 32 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 22   }}>RoadWatch</div>
          <div style={{ color: 'var(--color-sidebar-text)', fontSize: 12, letterSpacing: 0.5 }}>
            FLEET DEFECT MONITOR
          </div>
        </Link>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 12px',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 500,
                color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent'
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <AutoVoiceToggle />
        <LogoutButton />
      </div>
    </aside>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        width: '100%',
        marginTop: 8,
        padding: '10px 12px',
        fontSize: 15,
        fontWeight: 500,
        color: 'var(--color-sidebar-text)',
        background: 'transparent',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        textAlign: 'left'
      }}
    >
      Logout
    </button>
  );
}

function AutoVoiceToggle() {
  const { isAutoVoiceOn, setIsAutoVoiceOn } = useAutoVoice();

  return (
    <div
      style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px'
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-sidebar-text)' }}>
        🔊 Auto Voice
      </span>
      <button
        onClick={() => setIsAutoVoiceOn((on) => !on)}
        aria-label="Toggle automatic voice readout"
        aria-pressed={isAutoVoiceOn}
        style={{
          width: 40,
          height: 22,
          borderRadius: 999,
          border: 'none',
          padding: 2,
          cursor: 'pointer',
          background: isAutoVoiceOn ? 'var(--color-status-green)' : 'rgba(255,255,255,0.15)',
          transition: 'background 0.15s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isAutoVoiceOn ? 'flex-end' : 'flex-start'
        }}
      >
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#ffffff',
            display: 'block'
          }}
        />
      </button>
    </div>
  );
}