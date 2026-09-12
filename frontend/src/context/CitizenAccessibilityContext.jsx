import { createContext, useContext, useState } from 'react';
import { citizenTranslations } from '../utils/citizenTranslations';

const CitizenAccessibilityContext = createContext(null);

const MIN_SCALE = 0.85;
const MAX_SCALE = 1.3;
const STEP = 0.1;

export function CitizenAccessibilityProvider({ children }) {
  const [theme, setTheme] = useState('light'); // 'dark' | 'light'
  const [fontScale, setFontScale] = useState(1);
  const [language, setLanguage] = useState('en'); // 'en' | 'ta' | 'hi'

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

  function t(key) {
    return citizenTranslations[language]?.[key] ?? citizenTranslations.en[key] ?? key;
  }

  return (
    <CitizenAccessibilityContext.Provider
      value={{
        theme,
        toggleTheme,
        fontScale,
        increaseFont,
        decreaseFont,
        resetFont,
        language,
        setLanguage,
        t
      }}
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