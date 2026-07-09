// Badges de prioridad, complejidad y estado — componentes reutilizables.
// PARIDAD POWER APPS: Equivale a un Label con Fill y Color condicionales:
// If(ThisItem.priority = "Alta", RGBA(253,231,233,1), ...)

import { Badge, makeStyles } from '@fluentui/react-components';
import {
  PRIORITY_COLORS,
  COMPLEXITY_COLORS,
  INITIATIVE_STATUS_COLORS,
  IDEA_STATUS_COLORS,
} from '../../utils/constants';

const useStyles = makeStyles({
  badge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '2px 10px',
    borderRadius: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: '18px',
    whiteSpace: 'nowrap',
  },
});

function ColorBadge({ label, colors }) {
  const styles = useStyles();
  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: colors?.bg || '#F3F2F1',
        color: colors?.text || '#605E5C',
        border: `1px solid ${colors?.border || '#A19F9D'}`,
      }}
    >
      {label}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  return <ColorBadge label={priority} colors={PRIORITY_COLORS[priority]} />;
}

export function ComplexityBadge({ complexity }) {
  return <ColorBadge label={complexity} colors={COMPLEXITY_COLORS[complexity]} />;
}

export function InitiativeStatusBadge({ status }) {
  return <ColorBadge label={status} colors={INITIATIVE_STATUS_COLORS[status]} />;
}

export function IdeaStatusBadge({ status }) {
  return <ColorBadge label={status} colors={IDEA_STATUS_COLORS[status]} />;
}
