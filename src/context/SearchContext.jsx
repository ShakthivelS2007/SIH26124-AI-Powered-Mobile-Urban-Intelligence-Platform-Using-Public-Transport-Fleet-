import { createContext, useContext, useState } from 'react';

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [busIdQuery, setBusIdQuery] = useState('');
  return (
    <SearchContext.Provider value={{ busIdQuery, setBusIdQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useBusIdSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useBusIdSearch must be used within SearchProvider');
  return ctx;
}
