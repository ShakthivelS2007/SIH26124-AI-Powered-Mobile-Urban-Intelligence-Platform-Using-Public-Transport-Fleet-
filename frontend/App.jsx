import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SearchProvider } from './context/SearchContext';
import { LanguageProvider } from './context/LanguageContext';
import { AutoVoiceProvider } from './context/AutoVoiceContext';

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AutoVoiceProvider>
          <SearchProvider>
            <AppRoutes />
          </SearchProvider>
        </AutoVoiceProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
