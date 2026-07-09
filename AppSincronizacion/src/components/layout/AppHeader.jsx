// PARIDAD POWER APPS: Equivale al Header/TopBar que se configura en App.OnStart
// con el nombre de la app y la info del usuario. En Power Apps se haría con un
// componente reutilizable (Component) con Labels + Icons en un contenedor horizontal.

import {
  makeStyles,
  tokens,
  Text,
  Button,
  Avatar,
  Tooltip,
} from '@fluentui/react-components';
import {
  SignOut24Regular,
  Database24Regular,
  BrainCircuit24Regular,
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from '@fluentui/react-icons';
import { useAppContext } from '../../hooks/useAppContext';
import { useDataContext } from '../../hooks/useDataContext';
import { useTheme } from '../../hooks/useTheme';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: '48px',
    backgroundColor: '#6B46B8',
    color: 'white',
    boxShadow: tokens.shadow4,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
  },
  brandIcon: {
    color: 'white',
    fontSize: '24px',
  },
  brandText: {
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    letterSpacing: '-0.2px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userName: {
    color: 'white',
    fontSize: '13px',
    opacity: 0.95,
  },
  userRole: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '11px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logoutBtn: {
    color: 'white',
    minWidth: 'auto',
    padding: '4px 8px',
  },
  resetBtn: {
    color: 'rgba(255,255,255,0.8)',
    minWidth: 'auto',
    padding: '4px 8px',
    fontSize: '12px',
  },
});

export default function AppHeader() {
  const styles = useStyles();
  const { currentUser, logout, navigate } = useAppContext();
  const { resetAllData } = useDataContext();
  const { isDark, toggleTheme, theme } = useTheme();

  if (!currentUser) return null;

  const initials = currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2);

  return (
    <header
      className={styles.header}
      style={{
        backgroundColor: theme.headerBg,
        color: 'white',
      }}
    >
      <div
        className={styles.brand}
        onClick={() => navigate('dashboard')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate('dashboard')}
      >
        <BrainCircuit24Regular className={styles.brandIcon} />
        <span className={styles.brandText}>CoE IA Sync App</span>
      </div>

      <div className={styles.userSection}>
        <Tooltip content="Resetear datos mock" relationship="description">
          <Button
            className={styles.resetBtn}
            appearance="subtle"
            icon={<Database24Regular />}
            size="small"
            onClick={resetAllData}
          />
        </Tooltip>

        <Tooltip content={isDark ? 'Modo claro' : 'Modo oscuro'} relationship="description">
          <Button
            className={styles.resetBtn}
            appearance="subtle"
            icon={isDark ? <WeatherSunny24Regular /> : <WeatherMoon24Regular />}
            size="small"
            onClick={toggleTheme}
          />
        </Tooltip>

        <div className={styles.userInfo}>
          <Text className={styles.userName}>{currentUser.name}</Text>
          <Text className={styles.userRole}>
            {currentUser.team} · {currentUser.role}
            {currentUser.is_coe ? ' · CoE' : ''}
          </Text>
        </div>

        <Avatar name={currentUser.name} initials={initials} size={32} color="colorful" />

        <Tooltip content="Cerrar sesión" relationship="description">
          <Button
            className={styles.logoutBtn}
            appearance="subtle"
            icon={<SignOut24Regular />}
            size="small"
            onClick={logout}
          />
        </Tooltip>
      </div>
    </header>
  );
}
