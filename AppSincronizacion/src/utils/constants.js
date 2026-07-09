export const TEAMS = {
  MANTENIMIENTO: 'Mantenimiento',
  QA: 'QA',
  DESARROLLO: 'Desarrollo',
};

export const TEAM_LIST = Object.values(TEAMS);

export const ROLES = {
  ADMIN: 'admin',
  MIEMBRO: 'miembro',
};

export const IDEA_STATUSES = {
  NUEVA: 'Nueva',
  EN_REVISION: 'En Revisión',
  APROBADA: 'Aprobada',
  RECHAZADA: 'Rechazada',
  CONVERTIDA: 'Convertida',
};

export const IDEA_STATUS_LIST = [
  IDEA_STATUSES.NUEVA,
  IDEA_STATUSES.EN_REVISION,
  IDEA_STATUSES.APROBADA,
  IDEA_STATUSES.RECHAZADA,
  IDEA_STATUSES.CONVERTIDA,
];

export const INITIATIVE_STATUSES = {
  PLANIFICACION: 'Planificación',
  EN_PROGRESO: 'En Progreso',
  REVISION: 'Revisión',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
};

export const INITIATIVE_STATUS_LIST = [
  INITIATIVE_STATUSES.PLANIFICACION,
  INITIATIVE_STATUSES.EN_PROGRESO,
  INITIATIVE_STATUSES.REVISION,
  INITIATIVE_STATUSES.COMPLETADA,
  INITIATIVE_STATUSES.CANCELADA,
];

export const INITIATIVE_NEXT_STATUS = {
  [INITIATIVE_STATUSES.PLANIFICACION]: INITIATIVE_STATUSES.EN_PROGRESO,
  [INITIATIVE_STATUSES.EN_PROGRESO]: INITIATIVE_STATUSES.REVISION,
  [INITIATIVE_STATUSES.REVISION]: INITIATIVE_STATUSES.COMPLETADA,
  [INITIATIVE_STATUSES.COMPLETADA]: null,
  [INITIATIVE_STATUSES.CANCELADA]: null,
};

export const PRIORITIES = {
  ALTA: 'Alta',
  MEDIA: 'Media',
  BAJA: 'Baja',
};

export const PRIORITY_LIST = [PRIORITIES.ALTA, PRIORITIES.MEDIA, PRIORITIES.BAJA];

export const COMPLEXITIES = {
  ALTA: 'Alta',
  MEDIA: 'Media',
  BAJA: 'Baja',
};

export const IDEA_STATUS_COLORS = {
  [IDEA_STATUSES.NUEVA]: { bg: '#E8DDF4', text: 'var(--color-primary)', border: 'var(--color-primary)' },
  [IDEA_STATUSES.EN_REVISION]: { bg: '#FFF4CE', text: 'var(--color-warning)', border: 'var(--color-warning)' },
  [IDEA_STATUSES.APROBADA]: { bg: '#DFF6DD', text: 'var(--color-success)', border: 'var(--color-success)' },
  [IDEA_STATUSES.RECHAZADA]: { bg: '#FDE7E9', text: 'var(--color-danger)', border: 'var(--color-danger)' },
  [IDEA_STATUSES.CONVERTIDA]: { bg: '#B8A3D8', text: 'var(--color-dark-navy)', border: 'var(--color-primary)' },
};

export const INITIATIVE_STATUS_COLORS = {
  [INITIATIVE_STATUSES.PLANIFICACION]: { bg: '#F5F5F5', text: '#605E5C', border: '#A19F9D' },
  [INITIATIVE_STATUSES.EN_PROGRESO]: { bg: '#E8DDF4', text: 'var(--color-dark-navy)', border: 'var(--color-dark-navy)' },
  [INITIATIVE_STATUSES.REVISION]: { bg: '#FFF4CE', text: 'var(--color-warning)', border: 'var(--color-warning)' },
  [INITIATIVE_STATUSES.COMPLETADA]: { bg: '#DFF6DD', text: 'var(--color-success)', border: 'var(--color-success)' },
  [INITIATIVE_STATUSES.CANCELADA]: { bg: '#FDE7E9', text: 'var(--color-danger)', border: 'var(--color-danger)' },
};

export const PRIORITY_COLORS = {
  [PRIORITIES.ALTA]: { bg: '#FDE7E9', text: 'var(--color-danger)', border: 'var(--color-danger)' },
  [PRIORITIES.MEDIA]: { bg: '#FFF4CE', text: 'var(--color-warning)', border: 'var(--color-warning)' },
  [PRIORITIES.BAJA]: { bg: '#DFF6DD', text: 'var(--color-success)', border: 'var(--color-success)' },
};

export const COMPLEXITY_COLORS = {
  [COMPLEXITIES.ALTA]: { bg: '#FDE7E9', text: 'var(--color-danger)', border: 'var(--color-danger)' },
  [COMPLEXITIES.MEDIA]: { bg: '#FFF4CE', text: 'var(--color-warning)', border: 'var(--color-warning)' },
  [COMPLEXITIES.BAJA]: { bg: '#DFF6DD', text: 'var(--color-success)', border: 'var(--color-success)' },
};

export const SCREENS = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  NEW_IDEA: 'new-idea',
  MANAGE_IDEAS: 'manage-ideas',
  MANAGE_INITIATIVES: 'manage-initiatives',
  KANBAN: 'kanban',
  INITIATIVE_DETAIL: 'initiative-detail',
  BACKLOG: 'backlog',
};

export const TEAM_CODE_PREFIX = {
  [TEAMS.MANTENIMIENTO]: 'MNT',
  [TEAMS.QA]: 'QA',
  [TEAMS.DESARROLLO]: 'DEV',
};
