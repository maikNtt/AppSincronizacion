// PARIDAD POWER APPS: Card de conteo. Equivale a un control de tipo "Card" o
// un contenedor con Label para el número y Label para el título.
// El valor se calcularía con CountRows(Filter(Ideas, status = "Nueva"))

import { makeStyles, tokens, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 16px',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    border: '1px solid #E8DDF4',
    minWidth: '120px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
    },
    ':hover': {
      boxShadow: '0 8px 20px rgba(64, 32, 96, 0.15)',
      borderColor: '#D9C9F0',
      transform: 'translateY(-4px)',
    },
  },
  icon: {
    fontSize: '28px',
    marginBottom: '8px',
    position: 'relative',
    zIndex: 1,
  },
  count: {
    fontSize: '32px',
    fontWeight: '800',
    lineHeight: '40px',
    position: 'relative',
    zIndex: 1,
  },
  label: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#605E5C',
    marginTop: '8px',
    textAlign: 'center',
    lineHeight: '16px',
    position: 'relative',
    zIndex: 1,
    textTransform: 'capitalize',
  },
  dot: {
    width: '0px',
    height: '0px',
    display: 'none',
  },
});

export default function StatCard({ count, label, color, icon: Icon }) {
  const styles = useStyles();
  const labelId = label?.replace(/\s+/g, '-') || '';

  return (
    <div className={styles.card}>
      <style>{`
        #stat-${labelId} {
          border-top: 4px solid ${color};
        }
      `}</style>
      <div id={`stat-${labelId}`} style={{ width: '100%' }} />
      {Icon && <Icon className={styles.icon} style={{ color }} />}
      <Text className={styles.count} style={{ color }}>
        {count}
      </Text>
      <Text className={styles.label}>{label}</Text>
    </div>
  );
}
