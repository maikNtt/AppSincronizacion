// PARIDAD POWER APPS: Cada columna equivale a una Gallery filtrada por estado:
// Items = Filter(Initiatives, status = "Backlog" && team_id = varTeam)
// El header muestra el nombre del estado y CountRows(Filter(...)).

import { makeStyles, tokens, Text } from '@fluentui/react-components';
import InitiativeCard from './InitiativeCard';

const useStyles = makeStyles({
  column: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '260px',
    flex: '1',
    backgroundColor: '#F3F2F1',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px',
    backgroundColor: 'white',
    borderBottom: '2px solid',
  },
  statusName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#323130',
  },
  count: {
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: '#EDEBE9',
    borderRadius: '10px',
    padding: '2px 8px',
    color: '#605E5C',
  },
  list: {
    padding: '8px',
    overflowY: 'auto',
    flex: '1',
    minHeight: '200px',
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontSize: '12px',
    color: '#A19F9D',
    fontStyle: 'italic',
  },
});

export default function KanbanColumn({ status, color, initiatives, currentUser, onMove, onNavigate }) {
  const styles = useStyles();

  return (
    <div className={styles.column}>
      <div className={styles.header} style={{ borderBottomColor: color }}>
        <Text className={styles.statusName}>{status}</Text>
        <span className={styles.count}>{initiatives.length}</span>
      </div>
      <div className={styles.list}>
        {initiatives.length === 0 ? (
          <div className={styles.empty}>Sin iniciativas</div>
        ) : (
          initiatives.map((init) => (
            <InitiativeCard
              key={init.id}
              initiative={init}
              currentUser={currentUser}
              onMove={onMove}
              onNavigate={onNavigate}
            />
          ))
        )}
      </div>
    </div>
  );
}
