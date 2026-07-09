// PARIDAD POWER APPS: Card de iniciativa dentro de una Gallery.
// Equivale a un template de Gallery con:
// - Label (código + nombre)
// - Labels con formato condicional para prioridad/complejidad (badges)
// - Button condicional "Mover a →" con Visible = If(varCurrentUser.role = "admin" || varCurrentUser.is_coe, true)
// - OnSelect del contenedor → Navigate(DetalleScreen, {initiativeId: ThisItem.id})

import { makeStyles, tokens, Text, Button } from '@fluentui/react-components';
import { ArrowRight16Regular } from '@fluentui/react-icons';
import { PriorityBadge, ComplexityBadge } from '../shared/Badges';
import { INITIATIVE_NEXT_STATUS } from '../../utils/constants';
import { canManage } from '../../utils/helpers';

const useStyles = makeStyles({
  card: {
    backgroundColor: 'white',
    border: '1px solid #EDEBE9',
    borderRadius: '8px',
    padding: '14px',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  code: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#6B46B8',
    fontFamily: '"Consolas", "Courier New", monospace',
    marginBottom: '4px',
    display: 'block',
  },
  name: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#323130',
    lineHeight: '18px',
    marginBottom: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  badges: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  moveBtn: {
    width: '100%',
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '4px',
  },
  teamTag: {
    fontSize: '10px',
    color: '#A19F9D',
    marginBottom: '6px',
    display: 'block',
  },
});

export default function InitiativeCard({ initiative, currentUser, onMove, onNavigate }) {
  const styles = useStyles();
  const nextStatus = INITIATIVE_NEXT_STATUS[initiative.status];
  const showMoveBtn = canManage(currentUser) && nextStatus;

  const handleCardClick = (e) => {
    // No navegar si se hizo clic en el botón
    if (e.target.closest('button')) return;
    onNavigate(initiative.id);
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onNavigate(initiative.id)}
    >
      <Text className={styles.code}>{initiative.code}</Text>
      <Text className={styles.teamTag}>{initiative.team_id}</Text>
      <Text className={styles.name}>{initiative.name}</Text>
      <div className={styles.badges}>
        <PriorityBadge priority={initiative.priority} />
        <ComplexityBadge complexity={initiative.complexity} />
      </div>
      {showMoveBtn && (
        <Button
          className={styles.moveBtn}
          appearance="primary"
          size="small"
          icon={<ArrowRight16Regular />}
          iconPosition="after"
          onClick={(e) => {
            e.stopPropagation();
            onMove(initiative.id, nextStatus);
          }}
        >
          Mover a {nextStatus}
        </Button>
      )}
    </div>
  );
}
