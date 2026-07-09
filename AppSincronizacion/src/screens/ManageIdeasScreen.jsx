// PARIDAD POWER APPS: Pantalla de gestión de ideas.
// Screen con:
// - Gallery de ideas filtradas por estado
// - Botones para cambiar estado (Aprobar, Rechazar, Enviar a revisión)
// - Vista por tablas o cards
// - Filtro por estado de idea

import { useState, useMemo } from 'react';
import {
  makeStyles,
  Text,
  Button,
  Badge,
  Divider,
} from '@fluentui/react-components';
import {
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  ClipboardEditRegular,
  Lightbulb24Regular,
} from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import { useToast } from '../hooks/useToast';
import { SCREENS, IDEA_STATUSES, IDEA_STATUS_LIST, IDEA_STATUS_COLORS } from '../utils/constants';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  headerIcon: {
    fontSize: '28px',
    color: 'var(--color-secondary)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#323130',
  },
  filterSection: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterButton: {
    fontSize: '13px',
    fontWeight: '600',
    minWidth: '100px',
    backgroundColor: 'var(--color-secondary)',
    color: 'white',
    border: '1px solid #402060',
    ':hover': {
      backgroundColor: 'var(--color-secondary)',
      borderColor: 'var(--color-secondary)',
    },
  },
  filterButtonSecondary: {
    fontSize: '13px',
    fontWeight: '600',
    minWidth: '100px',
    backgroundColor: 'white',
    color: 'var(--color-secondary)',
    border: '1px solid #D9C9F0',
    ':hover': {
      backgroundColor: '#F5F0F8',
      borderColor: 'var(--color-secondary)',
    },
  },
  ideasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ideaCard: {
    backgroundColor: 'white',
    border: '1px solid #E8DDF4',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    transition: 'all 0.3s ease',
    ':hover': {
      boxShadow: '0 6px 16px rgba(64, 32, 96, 0.12)',
      borderColor: '#D9C9F0',
    },
  },
  ideaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ideaTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#323130',
  },
  ideaMeta: {
    fontSize: '12px',
    color: '#605E5C',
    marginTop: '4px',
    display: 'flex',
    gap: '12px',
  },
  ideaContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  problemSection: {
    backgroundColor: '#F5F5F5',
    padding: '12px',
    borderRadius: '6px',
    borderLeft: '3px solid #402060',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#605E5C',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  sectionText: {
    fontSize: '13px',
    color: '#323130',
    lineHeight: '18px',
  },
  ideaActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: 'var(--color-secondary)',
    color: 'white',
    border: 'none',
    fontWeight: '600',
    ':hover': {
      backgroundColor: 'var(--color-secondary)',
    },
  },
  actionButtonSecondary: {
    backgroundColor: 'white',
    color: 'var(--color-secondary)',
    border: '1px solid #D9C9F0',
    fontWeight: '600',
    ':hover': {
      backgroundColor: '#F5F0F8',
      borderColor: 'var(--color-secondary)',
    },
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 24px',
    color: '#A19F9D',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 8px',
  },
});

export default function ManageIdeasScreen() {
  const styles = useStyles();
  const { currentUser, goBack } = useAppContext();
  const { getIdeasByTeam, updateIdeaStatus, convertIdeaToInitiative } = useDataContext();
  const { showToast } = useToast();

  const [filterStatus, setFilterStatus] = useState(null);

  const teamIdeas = getIdeasByTeam(currentUser.team);

  const filteredIdeas = useMemo(() => {
    if (!filterStatus) return teamIdeas;
    return teamIdeas.filter((idea) => idea.status === filterStatus);
  }, [teamIdeas, filterStatus]);

  const handleApprove = (ideaId) => {
    updateIdeaStatus(ideaId, IDEA_STATUSES.APROBADA);
    showToast('Idea aprobada correctamente', 'success');
  };

  const handleReject = (ideaId) => {
    updateIdeaStatus(ideaId, IDEA_STATUSES.RECHAZADA);
    showToast('Idea rechazada', 'success');
  };

  const handleSendToReview = (ideaId) => {
    updateIdeaStatus(ideaId, IDEA_STATUSES.EN_REVISION);
    showToast('Idea enviada a revisión', 'success');
  };

  const handleConvert = (ideaId) => {
    convertIdeaToInitiative(ideaId, currentUser.team);
    showToast('Idea convertida a iniciativa ✓', 'success');
  };

  return (
    <>
      <div className={styles.header}>
        <ClipboardEditRegular className={styles.headerIcon} />
        <Text className={styles.title}>Gestionar ideas</Text>
      </div>

      <Text style={{ fontSize: '14px', color: '#605E5C', marginBottom: '16px' }}>
        Revisa, aprueba o rechaza las ideas registradas por tu equipo
      </Text>

      <Divider style={{ margin: '16px 0' }} />

      <div className={styles.filterSection}>
        <Button
          className={!filterStatus ? styles.filterButton : styles.filterButtonSecondary}
          appearance="secondary"
          onClick={() => setFilterStatus(null)}
          style={!filterStatus ? { backgroundColor: 'var(--color-dark-navy)', color: 'white', border: '1px solid #2B1B5E' } : {}}
        >
          Todas ({teamIdeas.length})
        </Button>
        {IDEA_STATUS_LIST.map((status) => {
          const count = teamIdeas.filter((idea) => idea.status === status).length;
          return (
            <Button
              key={status}
              className={filterStatus === status ? styles.filterButton : styles.filterButtonSecondary}
              appearance="secondary"
              onClick={() => setFilterStatus(status)}
              style={filterStatus === status ? { backgroundColor: 'var(--color-dark-navy)', color: 'white', border: '1px solid #2B1B5E' } : {}}
            >
              {status} ({count})
            </Button>
          );
        })}
      </div>

      {filteredIdeas.length === 0 ? (
        <div className={styles.emptyState}>
          <Lightbulb24Regular className={styles.emptyIcon} />
          <Text>
            {filterStatus
              ? `No hay ideas en estado "${filterStatus}"`
              : 'No hay ideas para tu equipo'}
          </Text>
        </div>
      ) : (
        <div className={styles.ideasList}>
          {filteredIdeas.map((idea) => {
            const statusColor = IDEA_STATUS_COLORS[idea.status];
            return (
              <div key={idea.id} className={styles.ideaCard}>
                <div className={styles.ideaHeader}>
                  <div>
                    <Text className={styles.ideaTitle}>{idea.title}</Text>
                    <div className={styles.ideaMeta}>
                      <span>Por: {idea.authors?.[0]?.name || 'Desconocido'}</span>
                      <span>•</span>
                      <span>{new Date(idea.created_at).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  <Badge
                    style={{
                      backgroundColor: statusColor?.bg,
                      color: statusColor?.text,
                      border: `1px solid ${statusColor?.border}`,
                      fontWeight: '600',
                    }}
                  >
                    {idea.status}
                  </Badge>
                </div>

                <div className={styles.ideaContent}>
                  <div className={styles.problemSection}>
                    <Text className={styles.sectionLabel}>Problema Actual</Text>
                    <Text className={styles.sectionText}>{idea.current_problem}</Text>
                  </div>

                  <div className={styles.problemSection}>
                    <Text className={styles.sectionLabel}>Solución Propuesta</Text>
                    <Text className={styles.sectionText}>{idea.proposed_solution}</Text>
                  </div>
                </div>

                {/* Acciones según el estado */}
                <div className={styles.ideaActions}>
                  {idea.status === IDEA_STATUSES.NUEVA && (
                    <>
                      <Button
                        appearance="secondary"
                        icon={<CheckmarkCircle24Regular />}
                        onClick={() => handleApprove(idea.id)}
                        style={{ backgroundColor: 'var(--color-success)', color: 'white', border: 'none' }}
                      >
                        Aprobar
                      </Button>
                      <Button
                        appearance="secondary"
                        onClick={() => handleSendToReview(idea.id)}
                        style={{ backgroundColor: 'var(--color-dark-navy)', color: 'white', border: 'none', fontWeight: '600' }}
                      >
                        Enviar a revisión
                      </Button>
                      <Button
                        appearance="secondary"
                        icon={<DismissCircle24Regular />}
                        onClick={() => handleReject(idea.id)}
                        style={{ backgroundColor: 'var(--color-danger)', color: 'white', border: 'none' }}
                      >
                        Rechazar
                      </Button>
                    </>
                  )}

                  {idea.status === IDEA_STATUSES.EN_REVISION && (
                    <>
                      <Button
                        appearance="secondary"
                        icon={<CheckmarkCircle24Regular />}
                        onClick={() => handleApprove(idea.id)}
                        style={{ backgroundColor: 'var(--color-success)', color: 'white', border: 'none', fontWeight: '600' }}
                      >
                        Aprobar
                      </Button>
                      <Button
                        appearance="secondary"
                        icon={<DismissCircle24Regular />}
                        onClick={() => handleReject(idea.id)}
                        style={{ backgroundColor: 'var(--color-danger)', color: 'white', border: 'none', fontWeight: '600' }}
                      >
                        Rechazar
                      </Button>
                    </>
                  )}

                  {idea.status === IDEA_STATUSES.APROBADA && (
                    <Button
                      appearance="secondary"
                      onClick={() => handleConvert(idea.id)}
                      style={{ backgroundColor: 'var(--color-dark-navy)', color: 'white', border: 'none', fontWeight: '600' }}
                    >
                      Convertir a iniciativa
                    </Button>
                  )}

                  {idea.status === IDEA_STATUSES.RECHAZADA && (
                    <Button
                      appearance="secondary"
                      onClick={() => handleSendToReview(idea.id)}
                      style={{ backgroundColor: 'var(--color-dark-navy)', color: 'white', border: 'none', fontWeight: '600' }}
                    >
                      Reconsiderar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Button
        appearance="secondary"
        style={{ marginTop: '24px', backgroundColor: 'var(--color-dark-navy)', color: 'white', border: 'none', fontWeight: '600' }}
        onClick={goBack}
      >
        Volver
      </Button>
    </>
  );
}
