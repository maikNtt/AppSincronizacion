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
  [IDEA_STATUSES.NUEVA]: { bg: '#E8DDF4', text: '#6B46B8', border: '#6B46B8' },
  [IDEA_STATUSES.EN_REVISION]: { bg: '#FFF4CE', text: '#FFB900', border: '#FFB900' },
  [IDEA_STATUSES.APROBADA]: { bg: '#DFF6DD', text: '#107C10', border: '#107C10' },
  [IDEA_STATUSES.RECHAZADA]: { bg: '#FDE7E9', text: '#D13438', border: '#D13438' },
  [IDEA_STATUSES.CONVERTIDA]: { bg: '#B8A3D8', text: '#2B1B5E', border: '#6B46B8' },
};

export const INITIATIVE_STATUS_COLORS = {
  [INITIATIVE_STATUSES.PLANIFICACION]: { bg: '#F5F5F5', text: '#605E5C', border: '#A19F9D' },
  [INITIATIVE_STATUSES.EN_PROGRESO]: { bg: '#E8DDF4', text: '#2B1B5E', border: '#2B1B5E' },
  [INITIATIVE_STATUSES.REVISION]: { bg: '#FFF4CE', text: '#FFB900', border: '#FFB900' },
  [INITIATIVE_STATUSES.COMPLETADA]: { bg: '#DFF6DD', text: '#107C10', border: '#107C10' },
  [INITIATIVE_STATUSES.CANCELADA]: { bg: '#FDE7E9', text: '#D13438', border: '#D13438' },
};

export const PRIORITY_COLORS = {
  [PRIORITIES.ALTA]: { bg: '#FDE7E9', text: '#D13438', border: '#D13438' },
  [PRIORITIES.MEDIA]: { bg: '#FFF4CE', text: '#FFB900', border: '#FFB900' },
  [PRIORITIES.BAJA]: { bg: '#DFF6DD', text: '#107C10', border: '#107C10' },
};

export const COMPLEXITY_COLORS = {
  [COMPLEXITIES.ALTA]: { bg: '#FDE7E9', text: '#D13438', border: '#D13438' },
  [COMPLEXITIES.MEDIA]: { bg: '#FFF4CE', text: '#FFB900', border: '#FFB900' },
  [COMPLEXITIES.BAJA]: { bg: '#DFF6DD', text: '#107C10', border: '#107C10' },
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
