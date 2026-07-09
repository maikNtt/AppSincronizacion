// Kanban preview compacto para el Dashboard
import { makeStyles, Text, Badge } from '@fluentui/react-components';
import { INITIATIVE_STATUS_LIST, INITIATIVE_STATUS_COLORS } from '../../utils/constants';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '12px',
  },
  column: {
    backgroundColor: '#F5F5F5',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minHeight: '280px',
    maxHeight: '380px',
    overflowY: 'auto',
  },
  columnHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '8px',
    borderBottom: '2px solid #E8DDF4',
  },
  columnTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#323130',
  },
  columnBadge: {
    fontSize: '11px',
    fontWeight: '600',
    minWidth: '24px',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '10px',
    borderLeft: '4px solid',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-1px)',
    },
  },
  cardTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#323130',
    marginBottom: '3px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardCode: {
    fontSize: '10px',
    color: '#605E5C',
    fontWeight: '500',
  },
  emptyState: {
    textAlign: 'center',
    color: '#A19F9D',
    fontSize: '11px',
    padding: '12px',
  },
});

export default function KanbanPreview({ initiatives, theme, isDark }) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {INITIATIVE_STATUS_LIST.map((status) => {
        const statusColor = INITIATIVE_STATUS_COLORS[status];
        const items = initiatives.filter((i) => i.status === status);

        return (
          <div
            key={status}
            className={styles.column}
            style={{
              backgroundColor: isDark ? '#141418' : '#F5F5F5',
              color: theme.text,
              borderColor: isDark ? '#2A2A32' : '#E8DDF4',
            }}
          >
            <div
              className={styles.columnHeader}
              style={{
                borderBottomColor: isDark ? '#2A2A32' : '#E8DDF4',
              }}
            >
              <Text
                className={styles.columnTitle}
                style={{
                  color: isDark ? '#FFFFFF' : '#323130',
                }}
              >
                {status}
              </Text>
              <Badge
                className={styles.columnBadge}
                style={{
                  backgroundColor: statusColor?.bg,
                  color: statusColor?.text,
                }}
              >
                {items.length}
              </Badge>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                flex: 1,
              }}
            >
              {items.length === 0 ? (
                <div
                  className={styles.emptyState}
                  style={{
                    color: isDark ? '#CCCCCC' : '#A19F9D',
                  }}
                >
                  Vacío
                </div>
              ) : (
                items.map((initiative) => (
                  <div
                    key={initiative.id}
                    className={styles.card}
                    style={{
                      borderLeftColor: statusColor?.text,
                      backgroundColor: isDark ? '#1F1F27' : 'white',
                      color: isDark ? '#FFFFFF' : '#323130',
                    }}
                  >
                    <div
                      className={styles.cardTitle}
                      style={{
                        color: isDark ? '#FFFFFF' : '#323130',
                      }}
                    >
                      {initiative.title || initiative.name}
                    </div>
                    <div
                      className={styles.cardCode}
                      style={{
                        color: isDark ? '#D0D0D0' : '#605E5C',
                      }}
                    >
                      {initiative.code}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
