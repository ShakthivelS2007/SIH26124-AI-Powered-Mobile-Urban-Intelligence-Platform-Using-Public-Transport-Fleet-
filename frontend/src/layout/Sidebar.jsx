import { useState } from 'react'; 
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAutoVoice } from '../context/AutoVoiceContext';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reports', label: 'Reports' },
  { to: '/settings', label: 'Settings' }
];


export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* thin hover strip so there's something to hover when the bar is hidden */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: 'var(--color-sidebar-bg)',
          zIndex: 2000
        }}
      />
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'var(--color-sidebar-bg)',
          transform: isHovered ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.25s ease',
          zIndex: 2001,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          padding: '0 24px'
        }}
      >
        <Link to="/" style={{ display: 'block' }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 20, lineHeight: 1.1 }}>RoadWatch</div>
          <div style={{ color: 'var(--color-sidebar-text)', fontSize: 10, letterSpacing: 0.5 }}>
            FLEET DEFECT MONITOR
          </div>
        </Link>

        <nav style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                color: isActive ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent'
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <AutoVoiceToggle />
          <LogoutButton />
        </div>
      </aside>
    </>
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
        padding: '10px 12px',
        fontSize: 15,
        fontWeight: 500,
        color: 'var(--color-sidebar-text)',
        background: 'transparent',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        whiteSpace: 'nowrap'
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
        display: 'flex',
        alignItems: 'ce nter',
        gap: 10
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