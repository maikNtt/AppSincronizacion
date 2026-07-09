// PARIDAD POWER APPS: Sección de información general de una iniciativa.
// Equivale a un DisplayForm con Labels para cada campo.
// En Power Apps se usaría: Form.DataSource = Initiatives, Form.Item = LookUp(Initiatives, id = varId)

import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { PriorityBadge, ComplexityBadge, InitiativeStatusBadge } from '../shared/Badges';
import { formatDate } from '../../utils/helpers';

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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fieldFull: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    gridColumn: '1 / -1',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#A19F9D',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '14px',
    color: '#323130',
    lineHeight: '20px',
  },
  badges: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
});

export default function InitiativeInfo({ initiative }) {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <Text className={styles.sectionTitle}>Información general</Text>
      <div className={styles.grid}>
        <div className={styles.field}>
          <Text className={styles.label}>Código</Text>
          <Text className={styles.value} style={{ fontFamily: '"Consolas", monospace', color: '#6B46B8', fontWeight: 600 }}>
            {initiative.code}
          </Text>
        </div>
        <div className={styles.field}>
          <Text className={styles.label}>Área</Text>
          <Text className={styles.value}>{initiative.team_id}</Text>
        </div>
        <div className={styles.field}>
          <Text className={styles.label}>Estado</Text>
          <div className={styles.badges}>
            <InitiativeStatusBadge status={initiative.status} />
          </div>
        </div>
        <div className={styles.field}>
          <Text className={styles.label}>Fecha de creación</Text>
          <Text className={styles.value}>{formatDate(initiative.created_at)}</Text>
        </div>
        <div className={styles.field}>
          <Text className={styles.label}>Prioridad</Text>
          <div className={styles.badges}>
            <PriorityBadge priority={initiative.priority} />
          </div>
        </div>
        <div className={styles.field}>
          <Text className={styles.label}>Complejidad</Text>
          <div className={styles.badges}>
            <ComplexityBadge complexity={initiative.complexity} />
          </div>
        </div>
        <div className={styles.fieldFull}>
          <Text className={styles.label}>Descripción</Text>
          <Text className={styles.value}>{initiative.description}</Text>
        </div>
        <div className={styles.fieldFull}>
          <Text className={styles.label}>Punto de dolor</Text>
          <Text className={styles.value}>{initiative.pain_point}</Text>
        </div>
        <div className={styles.fieldFull}>
          <Text className={styles.label}>Valor esperado</Text>
          <Text className={styles.value}>{initiative.expected_value}</Text>
        </div>
      </div>
    </div>
  );
}
