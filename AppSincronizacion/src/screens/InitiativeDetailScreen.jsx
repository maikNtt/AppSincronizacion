// PARIDAD POWER APPS: Pantalla de detalle de iniciativa.
// Screen con:
// - Button "← Volver" → Back() o Navigate(KanbanScreen/BacklogScreen)
// - DisplayForm (InitiativeInfo) con todos los campos
// - Gallery (StatusTimeline) con historial de estados
// - Gallery (DocumentsList) con documentos mock
// - Button "Mover a →" condicional (admin/is_coe)

import { makeStyles, Text, Button } from '@fluentui/react-components';
import {
  ArrowLeft24Regular,
  ArrowRight16Regular,
  Info24Regular,
} from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import { useToast } from '../hooks/useToast';
import InitiativeInfo from '../components/initiative/InitiativeInfo';
import StatusTimeline from '../components/initiative/StatusTimeline';
import DocumentsList from '../components/initiative/DocumentsList';
import { InitiativeStatusBadge } from '../components/shared/Badges';
import { INITIATIVE_NEXT_STATUS } from '../utils/constants';
import { canManage } from '../utils/helpers';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '24px',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '1',
  },
  titleText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  name: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#323130',
  },
  code: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#6B46B8',
    fontFamily: '"Consolas", monospace',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 24px',
    textAlign: 'center',
    gap: '16px',
  },
  notFoundIcon: {
    fontSize: '48px',
    color: '#A19F9D',
  },
});

export default function InitiativeDetailScreen() {
  const styles = useStyles();
  const { currentUser, screenParams, goBack } = useAppContext();
  const { getInitiativeById, getStatusHistory, getUserById, moveInitiative } = useDataContext();
  const { showToast } = useToast();

  const initiative = getInitiativeById(screenParams.initiativeId);
  const history = initiative ? getStatusHistory(initiative.id) : [];

  if (!initiative) {
    return (
      <div className={styles.notFound}>
        <Info24Regular className={styles.notFoundIcon} />
        <Text style={{ fontSize: '16px', color: '#605E5C' }}>
          Iniciativa no encontrada
        </Text>
        <Button appearance="primary" icon={<ArrowLeft24Regular />} onClick={goBack}>
          Volver
        </Button>
      </div>
    );
  }

  const nextStatus = INITIATIVE_NEXT_STATUS[initiative.status];
  const showMoveBtn = canManage(currentUser) && nextStatus;

  const handleMove = () => {
    moveInitiative(initiative.id, nextStatus, currentUser.id, '');
    showToast(`Iniciativa movida a "${nextStatus}"`, 'success');
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Button
            appearance="subtle"
            icon={<ArrowLeft24Regular />}
            onClick={goBack}
            size="large"
          />
          <div className={styles.titleText}>
            <Text className={styles.code}>{initiative.code}</Text>
            <Text className={styles.name}>{initiative.name}</Text>
          </div>
          <InitiativeStatusBadge status={initiative.status} />
        </div>
        <div className={styles.actions}>
          {showMoveBtn && (
            <Button
              appearance="primary"
              icon={<ArrowRight16Regular />}
              iconPosition="after"
              onClick={handleMove}
            >
              Mover a {nextStatus}
            </Button>
          )}
        </div>
      </div>

      <InitiativeInfo initiative={initiative} />
      <StatusTimeline history={history} getUserById={getUserById} />
      <DocumentsList documents={initiative.documents} />
    </>
  );
}
