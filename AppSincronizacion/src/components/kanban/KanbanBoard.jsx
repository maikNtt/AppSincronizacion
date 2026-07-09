// PARIDAD POWER APPS: Este layout equivale a un contenedor horizontal con 4 Galleries
// verticales, cada una filtrada por un estado diferente:
// Gallery1.Items = Filter(Initiatives, status = "Backlog", team_id = varTeam)
// Gallery2.Items = Filter(Initiatives, status = "En Progreso", team_id = varTeam)
// ... etc.
// El cambio de estado NO usa drag-and-drop. Se hace con Button.OnSelect →
// Patch(Initiatives, ThisItem, {status: "siguiente"}) +
// Patch(StatusHistory, Defaults(StatusHistory), {...})

import { makeStyles } from '@fluentui/react-components';
import KanbanColumn from './KanbanColumn';
import { INITIATIVE_STATUS_LIST, INITIATIVE_STATUS_COLORS } from '../../utils/constants';

const useStyles = makeStyles({
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '16px',
  },
  // Responsive: en pantallas pequeñas, scroll horizontal
  '@media (max-width: 900px)': {
    board: {
      gridTemplateColumns: 'repeat(4, 280px)',
    },
  },
});

export default function KanbanBoard({ initiatives, currentUser, onMove, onNavigate }) {
  const styles = useStyles();

  return (
    <div className={styles.board}>
      {INITIATIVE_STATUS_LIST.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          color={INITIATIVE_STATUS_COLORS[status]?.text || '#605E5C'}
          initiatives={initiatives.filter((i) => i.status === status)}
          currentUser={currentUser}
          onMove={onMove}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
