import { createContext, useContext, useState } from 'react';

const AutoVoiceContext = createContext(null);

export function AutoVoiceProvider({ children }) {
  const [isAutoVoiceOn, setIsAutoVoiceOn] = useState(false);
  return (
    <AutoVoiceContext.Provider value={{ isAutoVoiceOn, setIsAutoVoiceOn }}>
      {children}
    </AutoVoiceContext.Provider>
  );
}

export function useAutoVoice() {
  const ctx = useContext(AutoVoiceContext);
  if (!ctx) throw new Error('useAutoVoice must be used within AutoVoiceProvider');
  return ctx;
}