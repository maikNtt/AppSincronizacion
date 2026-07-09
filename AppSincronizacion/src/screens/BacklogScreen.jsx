// PARIDAD POWER APPS: Pantalla de backlog en formato tabla/lista.
// Screen con:
// - Label (título)
// - AreaSelector (Dropdown condicional)
// - Gallery vertical con template tipo tabla:
//   Items = SortByColumns(Filter(Initiatives, team_id = varTeam), "priority", Ascending)
// - Cada fila tiene Labels para: Código, Nombre, Prioridad, Complejidad, Estado, Fecha
// - OnSelect del template → Navigate(DetalleScreen, {initiativeId: ThisItem.id})
// Solo lectura — no hay acciones de edición.

import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { TaskListLtr24Regular } from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import AreaSelector from '../components/molecules/AreaSelector';
import { PriorityBadge, ComplexityBadge, InitiativeStatusBadge } from '../components/atoms/Badges';
import { formatDateShort, priorityOrder } from '../utils/helpers';
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
  table: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #EDEBE9',
    boxShadow: tokens.shadow2,
    overflow: 'hidden',
  },
  thead: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 90px 90px 110px 100px',
    padding: '12px 16px',
    backgroundColor: '#FAFAFA',
    borderBottom: '2px solid #EDEBE9',
    gap: '12px',
  },
  th: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#605E5C',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tbody: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '90px 1fr 90px 90px 110px 100px',
    padding: '12px 16px',
    borderBottom: '1px solid #F3F2F1',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  code: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-primary)',
    fontFamily: '"Consolas", monospace',
  },
  name: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#323130',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  date: {
    fontSize: '12px',
    color: '#605E5C',
  },
  empty: {
    padding: '40px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#A19F9D',
    fontStyle: 'italic',
  },
  count: {
    fontSize: '13px',
    color: '#A19F9D',
    marginBottom: '12px',
    display: 'block',
  },
});

export default function BacklogScreen() {
  const styles = useStyles();
  const { currentUser, selectedArea, navigate } = useAppContext();
  const { getInitiativesByTeam } = useDataContext();

  const filterArea = currentUser.is_coe ? selectedArea : currentUser.team;
  const initiatives = getInitiativesByTeam(filterArea)
    .sort((a, b) => {
      const pDiff = priorityOrder(a.priority) - priorityOrder(b.priority);
      if (pDiff !== 0) return pDiff;
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const handleRowClick = (initiativeId) => {
    navigate(SCREENS.INITIATIVE_DETAIL, { initiativeId, returnTo: SCREENS.BACKLOG });
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <TaskListLtr24Regular className={styles.icon} />
          <Text className={styles.title}>Backlog de área</Text>
        </div>
        <AreaSelector />
      </div>

      <Text className={styles.count}>
        {initiatives.length} iniciativa{initiatives.length !== 1 ? 's' : ''} en total
      </Text>

      <div className={styles.table}>
        <div className={styles.thead}>
          <Text className={styles.th}>Código</Text>
          <Text className={styles.th}>Nombre</Text>
          <Text className={styles.th}>Prioridad</Text>
          <Text className={styles.th}>Complejidad</Text>
          <Text className={styles.th}>Estado</Text>
          <Text className={styles.th}>Fecha</Text>
        </div>
        <div className={styles.tbody}>
          {initiatives.length === 0 ? (
            <div className={styles.empty}>No hay iniciativas en el backlog.</div>
          ) : (
            initiatives.map((init) => (
              <div
                key={init.id}
                className={styles.row}
                onClick={() => handleRowClick(init.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleRowClick(init.id)}
              >
                <Text className={styles.code}>{init.code}</Text>
                <Text className={styles.name}>{init.name}</Text>
                <PriorityBadge priority={init.priority} />
                <ComplexityBadge complexity={init.complexity} />
                <InitiativeStatusBadge status={init.status} />
                <Text className={styles.date}>{formatDateShort(init.created_at)}</Text>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
