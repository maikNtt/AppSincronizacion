// PARIDAD POWER APPS: Este componente es el equivalente a la App de Power Apps
// con su lógica de navegación entre Screens.
// En Power Apps, cada Screen es un contenedor de nivel superior y se navega con Navigate().
// Aquí usamos un switch por currentScreen que renderiza la pantalla correspondiente.
// Solo una pantalla es visible a la vez (igual que en Power Apps).

import { useAppContext } from './hooks/useAppContext';
import { useTheme } from './hooks/useTheme';
import { SCREENS } from './utils/constants';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import NewIdeaScreen from './screens/NewIdeaScreen';
import ManageIdeasScreen from './screens/ManageIdeasScreen';
import ManageInitiativesScreen from './screens/ManageInitiativesScreen';
import KanbanScreen from './screens/KanbanScreen';
import InitiativeDetailScreen from './screens/InitiativeDetailScreen';
import BacklogScreen from './screens/BacklogScreen';

// Layout
import AppHeader from './components/layout/AppHeader';
import ScreenContainer from './components/layout/ScreenContainer';

export default function App() {
  const { currentScreen } = useAppContext();
  const { theme } = useTheme();

  // Login screen tiene su propio layout (sin header)
  if (currentScreen === SCREENS.LOGIN) {
    return <LoginScreen />;
  }

  // Todas las demás pantallas usan el layout con header
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.DASHBOARD:
        return <DashboardScreen />;
      case SCREENS.NEW_IDEA:
        return <NewIdeaScreen />;
      case SCREENS.MANAGE_IDEAS:
        return <ManageIdeasScreen />;
      case SCREENS.MANAGE_INITIATIVES:
        return <ManageInitiativesScreen />;
      case SCREENS.KANBAN:
        return <KanbanScreen />;
      case SCREENS.INITIATIVE_DETAIL:
        return <InitiativeDetailScreen />;
      case SCREENS.BACKLOG:
        return <BacklogScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.text, minHeight: '100vh' }}>
      <AppHeader />
      <ScreenContainer>
        {renderScreen()}
      </ScreenContainer>
    </div>
  );
}
