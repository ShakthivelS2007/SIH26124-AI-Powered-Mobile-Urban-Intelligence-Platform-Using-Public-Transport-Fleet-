import { createContext, useContext } from 'react';
import useDefectData from '../hooks/useDefectData';

const DefectDataContext = createContext(null);

export function DefectDataProvider({ children }) {
  const data = useDefectData();
  return <DefectDataContext.Provider value={data}>{children}</DefectDataContext.Provider>;
}

export function useDefectDataContext() {
  return useContext(DefectDataContext);
}