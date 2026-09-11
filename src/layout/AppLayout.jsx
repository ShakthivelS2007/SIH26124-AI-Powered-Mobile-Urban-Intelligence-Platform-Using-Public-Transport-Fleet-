import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/reports': 'Reports',
  '/settings': 'Settings'
};

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const title =
    PAGE_TITLES[location.pathname] ??
    (location.pathname.startsWith('/defect/') ? 'Defect Detail' : 'RoadWatch');

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar
          title={title}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
          showSearch={location.pathname === '/dashboard'}
        />
        <main style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}