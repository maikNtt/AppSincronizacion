// PARIDAD POWER APPS: Pantalla de gestión de iniciativas.
// Gallery de iniciativas con acciones para cambiar estado

import { useState, useMemo } from 'react';
import {
  makeStyles,
  Text,
  Button,
  Badge,
  Divider,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import {
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  Board24Regular,
  ArrowRight24Regular,
  ClipboardCheckmark24Regular,
  Timer24Regular,
  Eye24Regular,
  Dismiss24Regular,
} from '@fluentui/react-icons';
import { useAppContext } from '../hooks/useAppContext';
import { useDataContext } from '../hooks/useDataContext';
import { useToast } from '../hooks/useToast';
import { SCREENS, INITIATIVE_STATUSES, INITIATIVE_STATUS_LIST, INITIATIVE_STATUS_COLORS } from '../utils/constants';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  headerIcon: {
    fontSize: '28px',
    color: '#2B1B5E',
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
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    marginBottom: '20px',
  },
  initiativeRow: {
    transition: 'background-color 0.2s ease',
  },
  initiativeRowHover: {
    ':hover': {
      backgroundColor: '#F5F0F8',
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
  actionsCell: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  actionButton: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: 'auto',
  },
  kpiCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #E8DDF4',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(64, 32, 96, 0.08)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    ':hover': {
      boxShadow: '0 8px 20px rgba(64, 32, 96, 0.15)',
      transform: 'translateY(-4px)',
    },
  },
  kpiIcon: {
    fontSize: '32px',
    color: '#2B1B5E',
  },
  kpiValue: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#2B1B5E',
  },
  kpiLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#605E5C',
    textTransform: 'uppercase',
    lineHeight: '16px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
});

export default function ManageInitiativesScreen() {
  const styles = useStyles();
  const { currentUser, navigate, goBack } = useAppContext();
  const { getInitiativesByTeam, updateInitiativeStatus } = useDataContext();
  const { showToast } = useToast();

  const [filterStatus, setFilterStatus] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' o 'canvas'

  const teamInitiatives = getInitiativesByTeam(currentUser.team);

  const filteredInitiatives = useMemo(() => {
    if (!filterStatus) return teamInitiatives;
    return teamInitiatives.filter((init) => init.status === filterStatus);
  }, [teamInitiatives, filterStatus]);

  const initCounts = INITIATIVE_STATUS_LIST.map((status) => ({
    status,
    count: teamInitiatives.filter((init) => init.status === status).length,
    icon: status === 'Planificación' ? Timer24Regular : 
          status === 'En Progreso' ? Eye24Regular :
          status === 'Revisión' ? ClipboardCheckmark24Regular :
          status === 'Completada' ? CheckmarkCircle24Regular :
          Dismiss24Regular,
  }));

  const handleStatusChange = (initiativeId, newStatus) => {
    updateInitiativeStatus(initiativeId, newStatus);
    showToast(`Iniciativa movida a ${newStatus}`, 'success');
  };

  const handleComplete = (initiativeId) => {
    updateInitiativeStatus(initiativeId, INITIATIVE_STATUSES.COMPLETADA);
    showToast('Iniciativa completada', 'success');
  };

  const handleCancel = (initiativeId) => {
    updateInitiativeStatus(initiativeId, INITIATIVE_STATUSES.CANCELADA);
    showToast('Iniciativa cancelada', 'success');
  };

  return (
    <>
      <div className={styles.header}>
        <Board24Regular className={styles.headerIcon} />
        <Text className={styles.title}>Gestionar iniciativas</Text>
      </div>

      <Text style={{ fontSize: '14px', color: '#605E5C', marginBottom: '16px' }}>
        Revisa, actualiza y monitorea el estado de las iniciativas del equipo
      </Text>

      <Divider style={{ margin: '16px 0' }} />

      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {initCounts.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.status} className={styles.kpiCard}>
              <Icon className={styles.kpiIcon} />
              <div className={styles.kpiValue}>{item.count}</div>
              <div className={styles.kpiLabel}>{item.status}</div>
            </div>
          );
        })}
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <Button
          className={styles.filterButton}
          appearance="secondary"
          onClick={() => setFilterStatus(null)}
          style={!filterStatus ? { backgroundColor: '#2B1B5E', color: 'white', border: '1px solid #2B1B5E' } : {}}
        >
          Todas ({teamInitiatives.length})
        </Button>
        {INITIATIVE_STATUS_LIST.map((status) => {
          const count = teamInitiatives.filter((init) => init.status === status).length;
          return (
            <Button
              key={status}
              className={styles.filterButton}
              appearance="secondary"
              onClick={() => setFilterStatus(status)}
              style={filterStatus === status ? { backgroundColor: '#2B1B5E', color: 'white', border: '1px solid #2B1B5E' } : {}}
            >
              {status} ({count})
            </Button>
          );
        })}
      </div>

      {filteredInitiatives.length === 0 ? (
        <div className={styles.emptyState}>
          <Board24Regular className={styles.emptyIcon} />
          <Text>
            {filterStatus
              ? `No hay iniciativas en estado "${filterStatus}"`
              : 'No hay iniciativas para tu equipo'}
          </Text>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Iniciativa</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Inicio</TableHeaderCell>
                <TableHeaderCell>Fin Estimado</TableHeaderCell>
                <TableHeaderCell>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInitiatives.map((initiative) => {
                const statusColor = INITIATIVE_STATUS_COLORS[initiative.status];
                const nextStatus =
                  initiative.status === INITIATIVE_STATUSES.PLANIFICACION
                    ? INITIATIVE_STATUSES.EN_PROGRESO
                    : initiative.status === INITIATIVE_STATUSES.EN_PROGRESO
                    ? INITIATIVE_STATUSES.REVISION
                    : null;

                return (
                  <TableRow key={initiative.id} className={styles.initiativeRow}>
                    <TableCell>{initiative.title}</TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor: statusColor?.bg,
                          color: statusColor?.text,
                          border: `1px solid ${statusColor?.border}`,
                          fontWeight: '600',
                        }}
                      >
                        {initiative.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(initiative.start_date).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{new Date(initiative.end_date).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>
                      <div className={styles.actionsCell}>
                        {nextStatus && (
                          <Button
                            appearance="secondary"
                            className={styles.actionButton}
                            onClick={() => handleStatusChange(initiative.id, nextStatus)}
                            icon={<ArrowRight24Regular />}
                            style={{ backgroundColor: '#2B1B5E', color: 'white', border: 'none', fontSize: '11px' }}
                          >
                            {nextStatus === INITIATIVE_STATUSES.EN_PROGRESO ? 'Iniciar' : 'Revisar'}
                          </Button>
                        )}
                        {initiative.status === INITIATIVE_STATUSES.REVISION && (
                          <Button
                            appearance="secondary"
                            className={styles.actionButton}
                            onClick={() => handleComplete(initiative.id)}
                            icon={<CheckmarkCircle24Regular />}
                            style={{ backgroundColor: '#107C10', color: 'white', border: 'none', fontSize: '11px' }}
                          >
                            Completar
                          </Button>
                        )}
                        {initiative.status !== INITIATIVE_STATUSES.COMPLETADA &&
                          initiative.status !== INITIATIVE_STATUSES.CANCELADA && (
                            <Button
                              appearance="secondary"
                              className={styles.actionButton}
                              onClick={() => handleCancel(initiative.id)}
                              icon={<DismissCircle24Regular />}
                              style={{ backgroundColor: '#D13438', color: 'white', border: 'none', fontSize: '11px' }}
                            >
                              Cancelar
                            </Button>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Button
        appearance="secondary"
        style={{ marginTop: '24px', backgroundColor: '#2B1B5E', color: 'white', border: 'none', fontWeight: '600' }}
        onClick={goBack}
      >
        Volver
      </Button>
    </>
  );
}
