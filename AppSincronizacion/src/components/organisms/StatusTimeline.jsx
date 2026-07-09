// PARIDAD POWER APPS: Timeline del historial de estados.
// Equivale a una Gallery vertical con:
// Items = SortByColumns(Filter(StatusHistory, initiative_id = varId), "changed_at", Descending)
// Cada template muestra Labels con from_status, to_status, changed_by, changed_at, notes.

import { makeStyles, tokens, Text } from '@fluentui/react-components';
import {
  ArrowRight16Regular,
  Clock16Regular,
  Person16Regular,
} from '@fluentui/react-icons';
import { formatDate } from '../../utils/helpers';
import { InitiativeStatusBadge } from '../atoms/Badges';

const useStyles = makeStyles({
  section: {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #EDEBE9',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: tokens.shadow2,
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#323130',
    marginBottom: '16px',
    display: 'block',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    position: 'relative',
  },
  entry: {
    display: 'flex',
    gap: '16px',
    position: 'relative',
    paddingBottom: '20px',
    paddingLeft: '24px',
  },
  line: {
    position: 'absolute',
    left: '7px',
    top: '8px',
    bottom: '0',
    width: '2px',
    backgroundColor: '#EDEBE9',
  },
  dot: {
    position: 'absolute',
    left: '2px',
    top: '4px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    border: '2px solid white',
    boxShadow: tokens.shadow2,
    zIndex: 1,
  },
  content: {
    flex: '1',
  },
  statusChange: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
    flexWrap: 'wrap',
  },
  arrow: {
    color: '#605E5C',
    fontSize: '14px',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '12px',
    color: '#A19F9D',
    marginBottom: '4px',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  notes: {
    fontSize: '13px',
    color: '#605E5C',
    lineHeight: '18px',
    marginTop: '4px',
    fontStyle: 'italic',
  },
  empty: {
    fontSize: '13px',
    color: '#A19F9D',
    fontStyle: 'italic',
    padding: '12px 0',
  },
});

export default function StatusTimeline({ history, getUserById }) {
  const styles = useStyles();

  if (!history || history.length === 0) {
    return (
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Historial de estados</Text>
        <Text className={styles.empty}>No hay cambios de estado registrados.</Text>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>Historial de estados</Text>
      <div className={styles.timeline}>
        {history.map((entry, index) => {
          const user = getUserById(entry.changed_by);
          const isLast = index === history.length - 1;
          return (
            <div key={entry.id} className={styles.entry}>
              <div className={styles.dot} />
              {!isLast && <div className={styles.line} />}
              <div className={styles.content}>
                <div className={styles.statusChange}>
                  <InitiativeStatusBadge status={entry.from_status} />
                  <ArrowRight16Regular className={styles.arrow} />
                  <InitiativeStatusBadge status={entry.to_status} />
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Person16Regular />
                    {user?.name || 'Usuario desconocido'}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock16Regular />
                    {formatDate(entry.changed_at)}
                  </span>
                </div>
                {entry.notes && (
                  <Text className={styles.notes}>"{entry.notes}"</Text>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
