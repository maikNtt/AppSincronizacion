import { createLightTheme } from '@fluentui/react-components';

// Brand ramp de 16 tonos basada en VIBRANT PRIMARY BLUE (NTT DATA Corporate)
const nttDataBrandRamp = {
  10: '#0A1435',  // Smart Navy - Muy oscuro
  20: '#07184A',  // Azul marino profundo
  30: '#042263',  // Azul oscuro vibrante
  40: '#004A99',  // Azul medio
  50: '#0072CE',  // Primary Blue Vibrante (NTT DATA Primary)
  60: '#338EDB',  // Azul claro brillante
  70: '#66AAE8',  // Azul suave brillante
  80: '#99C7F5',  // Azul background fuerte
  90: '#B3D6F7',  // Azul fondo claro
  100: '#CCE5F9', // Azul background ultra claro
  110: '#E6F2FC', // Azul background casi blanco
  120: '#F0F7FE', // Azul background blanco casi puro
  130: '#FFFFFF', // Blanco
  140: '#FFFFFF', // Blanco
  150: '#F4F6F9', // Gris página (AppBackground)
  160: '#FFFFFF', // Blanco puro
};

export const coeTheme = createLightTheme(nttDataBrandRamp);

// Override para fondo ligeramente gris (Corporate Light Theme)
coeTheme.colorNeutralBackground2 = '#F8F9FA';

// Colores adicionales de la paleta NTT DATA
export const colorPalette = {
  // Brand Colors
  primary: '#0072CE',      // Vibrant Primary Blue
  secondary: '#008BCB',    // Bright Secondary Blue
  darkNavy: '#0A1435',     // Deep Smart Navy
  
  // Status / Semantic
  warning: '#F2A900',      // Vibrant Yellow/Orange
  danger: '#E35205',       // Vibrant Red
  success: '#107C10',      // Vibrant Green
  
  // Neutros
  white: '#FFFFFF',
  bgApp: '#F4F6F9',
  bgCard: '#FFFFFF',
  border: '#D1D5DB',
  
  gray10: '#F5F5F5',
  gray20: '#EDEBE9',
  gray30: '#D0CCCB',
  gray40: '#A19F9D',
  gray50: '#605E5C',
  gray60: '#323130',
  black: '#000000',
};
