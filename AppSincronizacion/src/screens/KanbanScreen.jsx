// PARIDAD POWER APPS: Pantalla Kanban completa.
// Screen con:
// - Label (título)
// - AreaSelector (Dropdown condicional)
// - 4 × Gallery horizontal filtrada por estado
// - Cada Gallery template tiene InitiativeCard con Button "Mover a →"
// - Button.OnSelect → Patch(Initiatives, ...) + Patch(StatusHistory, ...) + Notify()

import { makeStyles, Text } from '@fluentui/react-components';
import { Board24Regular } from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import { useToast } from '../hooks/useToast';
import KanbanBoard from '../components/organisms/KanbanBoard';
import AreaSelector from '../components/molecules/AreaSelector';
import { SCREENS } from '../utils/constants';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '20px',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#323130',
  },
  icon: {
    fontSize: '26px',
    color: 'var(--color-primary)',
  },
});

export default function KanbanScreen() {
  const styles = useStyles();
  const { currentUser, selectedArea, navigate } = useAppContext();
  const { getInitiativesByTeam, moveInitiative } = useDataContext();
  const { showToast } = useToast();

  const filterArea = currentUser.is_coe ? selectedArea : currentUser.team;
  const initiatives = getInitiativesByTeam(filterArea);

  const handleMove = (initiativeId, newStatus) => {
    moveInitiative(initiativeId, newStatus, currentUser.id, '');
    showToast(`Iniciativa movida a "${newStatus}"`, 'success');
  };

  const handleNavigate = (initiativeId) => {
    navigate(SCREENS.INITIATIVE_DETAIL, { initiativeId, returnTo: SCREENS.KANBAN });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Board24Regular className={styles.icon} />
          <Text className={styles.title}>Tablero Kanban - Iniciativas</Text>
        </div>
        <AreaSelector />
      </div>
      <KanbanBoard
        initiatives={initiatives}
        currentUser={currentUser}
        onMove={handleMove}
        onNavigate={handleNavigate}
      />
    </>
  );
}
