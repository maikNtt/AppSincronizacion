import { createLightTheme } from '@fluentui/react-components';

// Brand ramp de 16 tonos basada en MORADO (Microsoft 365 Purple - Office, Teams, Copilot)
// Paleta morado-amarillo para compatibilidad Power Apps nativa
// OPTIMIZADO: Botones más oscuros (#402060) para mejor contraste en fondo blanco
const coeBrandRamp = {
  10: '#2B1B5E',  // Morado muy oscuro
  20: '#402060',  // Morado oscuro - BUTTON COLOR (más contraste)
  30: '#553373',  // Morado medio-oscuro
  40: '#6B46B8',  // Morado principal (PRIMARY BRAND) - hover/active
  50: '#7F5AC2',  // Morado hover
  60: '#9B7FCC',  // Morado claro
  70: '#B8A3D8',  // Morado muy claro
  80: '#E8DDF4',  // Morado background suave
  90: '#F0E8F5',  // Morado fondo muy claro
  100: '#F5F0F8', // Morado background ultra claro
  110: '#F9F7FC', // Morado background casi blanco
  120: '#FDFCFE', // Morado background blanco casi puro
  130: '#FFFFFF', // Blanco
  140: '#FFFFFF', // Blanco
  150: '#F5F5F5', // Gris página
  160: '#FFFFFF', // Blanco puro
};

export const coeTheme = createLightTheme(coeBrandRamp);

// Override para fondo ligeramente gris (como M365)
coeTheme.colorNeutralBackground2 = '#F5F5F5';

// Colores adicionales para la paleta morado-amarillo
export const colorPalette = {
  // Morados principales
  purple10: '#2B1B5E',
  purple20: '#402060',
  purple30: '#553373',
  purple40: '#6B46B8', // PRIMARY
  purple50: '#7F5AC2',
  purple60: '#9B7FCC',
  purple70: '#B8A3D8',
  purple80: '#E8DDF4',

  // Amarillos (accents)
  yellow20: '#B88C00',
  yellow30: '#C49C0D',
  yellow40: '#FFB900', // ACCENT PRIMARY
  yellow50: '#FFD461',
  yellow60: '#FFE8B6',
  yellow70: '#FFF4CE',

  // Neutros
  white: '#FFFFFF',
  gray10: '#F5F5F5',
  gray20: '#EDEBE9',
  gray30: '#D0CCCB',
  gray40: '#A19F9D',
  gray50: '#605E5C',
  gray60: '#323130',
  black: '#000000',

  // Estados
  error: '#D13438',
  success: '#107C10',
  info: '#6B46B8',
  warning: '#FFB900',
};
