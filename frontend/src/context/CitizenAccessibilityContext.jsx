import { createContext, useContext, useState } from 'react';

const CitizenAccessibilityContext = createContext(null);

const MIN_SCALE = 0.85;
const MAX_SCALE = 1.3;
const STEP = 0.1;

export function CitizenAccessibilityProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 'dark' | 'light'
  const [fontScale, setFontScale] = useState(1);

  function increaseFont() {
    setFontScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)));
  }

  function decreaseFont() {
    setFontScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(2)));
  }

  function resetFont() {
    setFontScale(1);
  }

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <CitizenAccessibilityContext.Provider
      value={{ theme, toggleTheme, fontScale, increaseFont, decreaseFont, resetFont }}
    >
      {children}
    </CitizenAccessibilityContext.Provider>
  );
}

export function useCitizenAccessibility() {
  const ctx = useContext(CitizenAccessibilityContext);
  if (!ctx) {
    throw new Error(
      'useCitizenAccessibility must be used within CitizenAccessibilityProvider'
    );
  }
  return ctx;
}