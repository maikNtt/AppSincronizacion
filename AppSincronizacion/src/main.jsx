import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider } from '@fluentui/react-components';
import { coeTheme } from './theme';
import { AppProvider } from './context/AppContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './hooks/useToast';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FluentProvider theme={coeTheme}>
      <ThemeProvider>
        <DataProvider>
          <AppProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AppProvider>
        </DataProvider>
      </ThemeProvider>
    </FluentProvider>
  </StrictMode>,
);
