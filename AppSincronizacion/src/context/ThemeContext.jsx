import { createContext, useCallback, useState } from 'react';

const ThemeContext = createContext(null);

// Temas con análisis de contraste WCAG AA
const THEMES = {
  light: {
    name: 'light',
    bg: '#FFFFFF',
    bgSecondary: '#F5F5F5',
    text: '#323130',
    textSecondary: '#605E5C',
    border: '#E8DDF4',
    borderSecondary: '#EDEBE9',
    card: '#FFFFFF',
    shadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    shadowHover: '0 8px 20px rgba(64, 32, 96, 0.12)',
    headerGradient: 'linear-gradient(135deg, #2B1B5E 0%, #402060 50%, #553373 100%)',
    headerBg: '#6B46B8',
    accent: '#6B46B8',
    accentDark: '#2B1B5E',
  },
  dark: {
    name: 'dark',
    // Fondos: Escala de grises oscuros
    bg: '#0A0A0D',           // Fondo principal: casi negro puro
    bgSecondary: '#141418',  // Fondo secundario: muy oscuro
    // Textos: Blancos y grises claros para máximo contraste
    text: '#FFFFFF',         // Texto principal: blanco puro (contraste perfecto)
    textSecondary: '#E8E8E8', // Texto secundario: gris muy claro
    // Bordes: Grises para separación
    border: '#2A2A32',       // Bordes: gris oscuro
    borderSecondary: '#1F1F27',
    // Cards: Ligeramente más claros que fondo
    card: '#141418',         // Cards: ligeramente más claro que fondo principal
    shadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
    shadowHover: '0 8px 20px rgba(0, 0, 0, 0.7)',
    headerGradient: 'linear-gradient(135deg, #0A0A0D 0%, #1A0F28 50%, #2D1A3F 100%)',
    headerBg: '#0F0514',     // Header: más oscuro aún
    accent: '#BB88FF',       // Accents: morado claro para visibilidad
    accentDark: '#9966DD',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = THEMES[currentTheme];

  const value = {
    theme,
    currentTheme,
    toggleTheme,
    isDark: currentTheme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;
