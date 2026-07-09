// PARIDAD POWER APPS: Equivale al contenedor principal de cada Screen,
// con padding y centrado. En Power Apps el Screen ya provee el contenedor.

import { makeStyles } from '@fluentui/react-components';
import { useTheme } from '../../hooks/useTheme';

const useStyles = makeStyles({
  container: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '24px',
    minHeight: 'calc(100vh - 48px)',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
});

export default function ScreenContainer({ children }) {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <main
      className={styles.container}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {children}
    </main>
  );
}
