// PARIDAD POWER APPS: Card de acceso rápido. Equivale a un Button o Icon+Label
// con OnSelect = Navigate(TargetScreen). Se implementaría como un contenedor
// con un Icon, un Label y OnSelect → Navigate().

import { makeStyles, tokens, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    border: '1px solid #E8DDF4',
    cursor: 'pointer',
    textAlign: 'left',
    minHeight: '140px',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 8px 20px rgba(64, 32, 96, 0.15)',
      borderColor: '#D9C9F0',
      transform: 'translateY(-2px)',
    },
  },
  icon: {
    fontSize: '40px',
    color: '#402060',
    marginBottom: '12px',
    transition: 'color 0.3s ease, transform 0.3s ease',
  },
  cardHover: {
    ':hover .icon': {
      color: '#6B46B8',
      transform: 'scale(1.1)',
    },
  },
  title: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#323130',
    marginBottom: '6px',
  },
  description: {
    fontSize: '12px',
    color: '#605E5C',
    lineHeight: '16px',
    flex: 1,
  },
});

export default function QuickActionCard({ icon: Icon, title, description, onClick }) {
  const styles = useStyles();

  return (
    <div
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {Icon && <Icon className={styles.icon} />}
      <Text className={styles.title}>{title}</Text>
      <Text className={styles.description}>{description}</Text>
    </div>
  );
}
