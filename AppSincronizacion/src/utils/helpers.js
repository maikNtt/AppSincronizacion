export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return prefix ? `${prefix}-${timestamp}${random}` : `${timestamp}${random}`;
}

export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatDateShort(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatRelativeDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Ahora mismo';
  if (diffMins < 60) return `Hace ${diffMins} min`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 30) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  return formatDateShort(isoString);
}

export function generateInitiativeCode(teamPrefix, existingInitiatives, teamId) {
  const teamInits = existingInitiatives.filter((i) => i.team_id === teamId);
  const nextNum = teamInits.length + 1;
  return `${teamPrefix}-${String(nextNum).padStart(3, '0')}`;
}

export function nowISO() {
  return new Date().toISOString();
}

export function canManage(user) {
  if (!user) return false;
  return user.role === 'admin' || user.is_coe;
}

export function priorityOrder(priority) {
  const order = { Alta: 1, Media: 2, Baja: 3 };
  return order[priority] ?? 99;
}
