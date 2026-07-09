// PARIDAD POWER APPS: Esta pantalla equivale al DashboardScreen de Power Apps.
// Controles: Label (saludo), Gallery horizontal (StatCards = conteos),
// Gallery horizontal (QuickActionCards = accesos rápidos),
// Dropdown condicional (AreaSelector, Visible = varCurrentUser.is_coe).
// Los conteos se calculan con CountRows(Filter(Ideas, status = "X", team = varTeam)).

import { makeStyles, tokens, Text, Divider } from '@fluentui/react-components';
import {
  Lightbulb24Regular,
  Board24Regular,
  TaskListLtr24Regular,
  Add24Regular,
  CheckmarkCircle24Regular,
  ClipboardEditRegular,
  Settings24Regular,
  Eye24Regular,
  Timer24Regular,
  ClipboardCheckmark24Regular,
  Dismiss24Regular,
  Person24Regular,
} from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import { useTheme } from '../hooks/useTheme';
import StatCard from '../components/dashboard/StatCard';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import KanbanPreview from '../components/dashboard/KanbanPreview';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import SidebarMetrics from '../components/dashboard/SidebarMetrics';
import AreaSelector from '../components/shared/AreaSelector';
import { SCREENS, IDEA_STATUS_COLORS, INITIATIVE_STATUS_COLORS, IDEA_STATUS_LIST, INITIATIVE_STATUS_LIST } from '../utils/constants';

const useStyles = makeStyles({
  pageContainer: {
    display: 'flex',
    gap: '24px',
    minHeight: 'calc(100vh - 120px)',
  },
  headerSection: {
    display: 'flex',
    gap: '24px',
    alignItems: 'stretch',
  },
  header: {
    background: 'linear-gradient(135deg, #2B1B5E 0%, #402060 50%, #553373 100%)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 12px 32px rgba(43, 27, 94, 0.2)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    flex: 1.2,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerKPIs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    minWidth: '320px',
  },
  kpiMini: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    padding: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 6px 16px rgba(64, 32, 96, 0.12)',
      transform: 'translateY(-2px)',
    },
  },
  kpiMiniIcon: {
    fontSize: '20px',
    marginBottom: '4px',
  },
  kpiMiniValue: {
    fontSize: '18px',
    fontWeight: '800',
    lineHeight: '24px',
  },
  kpiMiniLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#605E5C',
    marginTop: '4px',
    textTransform: 'uppercase',
  },
  headerOverlay: {
    position: 'absolute',
    top: '-30%',
    right: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255, 185, 0, 0.08)',
    pointerEvents: 'none',
  },
  headerOverlay2: {
    position: 'absolute',
    bottom: '-20%',
    left: '-10%',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(107, 70, 184, 0.1)',
    pointerEvents: 'none',
  },
  greeting: {
    marginBottom: '12px',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  greetingIcon: {
    fontSize: '36px',
  },
  greetingName: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
  },
  greetingSub: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.88)',
    marginBottom: '16px',
    display: 'block',
    position: 'relative',
    zIndex: 2,
  },
  headerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    position: 'relative',
    zIndex: 2,
  },
  sidebar: {
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    minWidth: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  sidebarCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 8px 16px rgba(64, 32, 96, 0.12)',
      borderColor: '#D9C9F0',
      transform: 'translateY(-2px)',
    },
  },
  sidebarIcon: {
    fontSize: '32px',
    color: '#2B1B5E',
    marginBottom: '4px',
  },
  sidebarTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#323130',
  },
  sidebarDesc: {
    fontSize: '11px',
    color: '#605E5C',
    lineHeight: '14px',
  },
  metricsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'all 0.3s ease',
  },
  metricsTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#323130',
    marginBottom: '8px',
  },
  metricsChart: {
    width: '100%',
    height: '200px',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  sectionIcon: {
    fontSize: '24px',
    color: '#2B1B5E',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#323130',
  },
  kanbanContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: '13px',
    fontWeight: '500',
  },
  '@media (max-width: 1024px)': {
    pageContainer: {
      flexDirection: 'column',
    },
    headerSection: {
      flexDirection: 'column',
    },
    headerKPIs: {
      width: '100%',
    },
    sidebar: {
      width: '100%',
      flexDirection: 'row',
      gap: '12px',
      overflowX: 'auto',
    },
    sidebarCard: {
      minWidth: '140px',
    },
  },
});

export default function DashboardScreen() {
  const styles = useStyles();
  const { currentUser, selectedArea, navigate } = useAppContext();
  const { getIdeasByTeam, getInitiativesByTeam } = useDataContext();
  const { theme, isDark } = useTheme();

  const filterArea = currentUser.is_coe ? selectedArea : currentUser.team;
  const ideas = getIdeasByTeam(filterArea);
  const initiatives = getInitiativesByTeam(filterArea);

  // Conteos de ideas por estado
  const ideaCounts = IDEA_STATUS_LIST.map((status) => ({
    status,
    count: ideas.filter((i) => i.status === status).length,
    color: IDEA_STATUS_COLORS[status]?.text || '#605E5C',
    icon: status === 'Nueva' ? Lightbulb24Regular :
          status === 'En Revisión' ? ClipboardEditRegular :
          status === 'Aprobada' ? CheckmarkCircle24Regular :
          status === 'Rechazada' ? Dismiss24Regular :
          ClipboardCheckmark24Regular,
  }));

  // Conteos de iniciativas por estado
  const initCounts = INITIATIVE_STATUS_LIST.map((status) => ({
    status,
    count: initiatives.filter((i) => i.status === status).length,
    color: INITIATIVE_STATUS_COLORS[status]?.text || '#605E5C',
    icon: status === 'Planificación' ? Timer24Regular :
          status === 'En Progreso' ? Eye24Regular :
          status === 'Revisión' ? ClipboardCheckmark24Regular :
          status === 'Completada' ? CheckmarkCircle24Regular :
          Dismiss24Regular,
  }));

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Header + KPIs Mini in one row */}
      <div className={styles.headerSection}>
        {/* Header Card */}
        <div
          className={styles.header}
          style={{
            background: isDark
              ? 'linear-gradient(135deg, #1A1028 0%, #2D1A3F 50%, #3D2850 100%)'
              : theme.headerGradient,
          }}
        >
          <div className={styles.headerOverlay} />
          <div className={styles.headerOverlay2} />
          <div className={styles.greeting}>
            <Person24Regular className={styles.greetingIcon} />
            <Text className={styles.greetingName}>Hola, {currentUser.name.split(' ')[0]}</Text>
          </div>
          <Text className={styles.greetingSub}>
            {currentUser.team} · {currentUser.role}{currentUser.is_coe ? ' · Centro de Excelencia IA' : ''}
          </Text>
          <div className={styles.headerBottom}>
            <Text className={styles.welcomeText}>
              ¡Bienvenido! Resumen de tu actividad
            </Text>
            <AreaSelector />
          </div>
        </div>

        {/* KPIs Mini - lado derecho del header */}
        <div className={styles.headerKPIs}>
          {/* Total Ideas */}
          <div
            className={styles.kpiMini}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            <Lightbulb24Regular className={styles.kpiMiniIcon} style={{ color: '#6B46B8' }} />
            <div className={styles.kpiMiniValue}>{ideas.length}</div>
            <div className={styles.kpiMiniLabel}>Ideas</div>
          </div>

          {/* Total Iniciativas */}
          <div
            className={styles.kpiMini}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            <Board24Regular className={styles.kpiMiniIcon} style={{ color: '#2B1B5E' }} />
            <div className={styles.kpiMiniValue}>{initiatives.length}</div>
            <div className={styles.kpiMiniLabel}>Iniciativas</div>
          </div>

          {/* Ideas Aprobadas */}
          <div
            className={styles.kpiMini}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            <CheckmarkCircle24Regular className={styles.kpiMiniIcon} style={{ color: '#107C10' }} />
            <div className={styles.kpiMiniValue}>{ideas.filter(i => i.status === 'Aprobada').length}</div>
            <div className={styles.kpiMiniLabel}>Aprobadas</div>
          </div>

          {/* En Progreso */}
          <div
            className={styles.kpiMini}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            <Eye24Regular className={styles.kpiMiniIcon} style={{ color: '#2B1B5E' }} />
            <div className={styles.kpiMiniValue}>{initiatives.filter(i => i.status === 'En Progreso').length}</div>
            <div className={styles.kpiMiniLabel}>En Progreso</div>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className={styles.pageContainer}>
        {/* SIDEBAR - Acciones rápidas */}
        <div className={styles.sidebar}>
          {/* Registrar Idea */}
          <div
            className={styles.sidebarCard}
            onClick={() => navigate(SCREENS.NEW_IDEA)}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <Add24Regular className={styles.sidebarIcon} />
            <Text className={styles.sidebarTitle} style={{ color: theme.text }}>Registrar idea</Text>
            <Text className={styles.sidebarDesc} style={{ color: theme.textSecondary }}>Proponer nueva idea</Text>
          </div>

          {/* Gestionar Ideas */}
          <div
            className={styles.sidebarCard}
            onClick={() => navigate(SCREENS.MANAGE_IDEAS)}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <ClipboardEditRegular className={styles.sidebarIcon} />
            <Text className={styles.sidebarTitle} style={{ color: theme.text }}>Gestionar ideas</Text>
            <Text className={styles.sidebarDesc} style={{ color: theme.textSecondary }}>Revisar y aprobar</Text>
          </div>

          {/* Gestionar Iniciativas */}
          <div
            className={styles.sidebarCard}
            onClick={() => navigate(SCREENS.MANAGE_INITIATIVES)}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <Settings24Regular className={styles.sidebarIcon} />
            <Text className={styles.sidebarTitle} style={{ color: theme.text }}>Gestionar inits</Text>
            <Text className={styles.sidebarDesc} style={{ color: theme.textSecondary }}>Administrar</Text>
          </div>

          {/* Ver Backlog */}
          <div
            className={styles.sidebarCard}
            onClick={() => navigate(SCREENS.BACKLOG)}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <TaskListLtr24Regular className={styles.sidebarIcon} />
            <Text className={styles.sidebarTitle} style={{ color: theme.text }}>Ver backlog</Text>
            <Text className={styles.sidebarDesc} style={{ color: theme.textSecondary }}>Consultar</Text>
          </div>

          {/* Métricas Card */}
          <div
            className={styles.metricsCard}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              boxShadow: theme.shadow,
            }}
          >
            <div
              className={styles.metricsTitle}
              style={{
                color: theme.text,
              }}
            >
              📊 Ideas por Estado
            </div>
            <SidebarMetrics ideas={ideas} theme={theme} isDark={isDark} />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.mainContent}>
          {/* Kanban Board - Full width */}
          <div
            className={styles.sectionContainer}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
              boxShadow: theme.shadow,
            }}
          >
            <div className={styles.sectionHeader}>
              <Board24Regular className={styles.sectionIcon} />
              <Text className={styles.sectionTitle} style={{ color: theme.text }}>Tablero Kanban</Text>
            </div>
            <div className={styles.kanbanContainer}>
              <KanbanPreview initiatives={initiatives} theme={theme} isDark={isDark} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
