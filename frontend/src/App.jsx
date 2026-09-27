import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SearchProvider } from './context/SearchContext';
import { LanguageProvider } from './context/LanguageContext';
import { AutoVoiceProvider } from './context/AutoVoiceContext';
import { AuthProvider } from './context/AuthContext';
import { DefectDataProvider } from './context/DefectDataContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <AutoVoiceProvider>
            <SearchProvider>    
              <DefectDataProvider>
                <AppRoutes />
              </DefectDataProvider>
            </SearchProvider>
          </AutoVoiceProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
