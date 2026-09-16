import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ComplaintPortal from '../pages/ComplaintPortal';
import AppLayout from '../layout/AppLayout';
import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import DefectDetail from '../pages/DefectDetail';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/Login';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/complaints" element={<ComplaintPortal />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/defect/:id" element={<DefectDetail />} />
      </Route>
    </Routes>
  );
}