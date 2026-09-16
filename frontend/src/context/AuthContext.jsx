import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = 'roadwatch_officer_session';

export function AuthProvider({ children }) {
  const [officer, setOfficer] = useState(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  function login(email, password) {
    if (!email.trim() || !password.trim()) {
      return { success: false, error: 'Enter both email and password.' };
    }
    const session = { email: email.trim() };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setOfficer(session);
    return { success: true };
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setOfficer(null);
  }

  return (
    <AuthContext.Provider value={{ officer, isAuthenticated: !!officer, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}