import usersData from '../data/users.json';
import ideasData from '../data/ideas.json';
import initiativesData from '../data/initiatives.json';
import statusHistoryData from '../data/statusHistory.json';
import { generateId, nowISO } from './helpers';

const STORAGE_KEY = 'coe-ia-sync-data';

export function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initializeData();
    }
  }
  return initializeData();
}

function initializeData() {
  const data = {
    users: usersData,
    ideas: ideasData,
    initiatives: initiativesData,
    statusHistory: statusHistoryData,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return initializeData();
}

export function getUsers(data) {
  return data.users;
}

export function getUserById(data, userId) {
  return data.users.find((u) => u.id === userId);
}

export function getUsersByTeam(data, team) {
  return data.users.filter((u) => u.team === team);
}

export function addIdea(data, ideaInput) {
  const newIdea = {
    id: generateId('idea'),
    title: ideaInput.title,
    current_problem: ideaInput.current_problem,
    proposed_solution: ideaInput.proposed_solution,
    status: 'Nueva',
    authors: ideaInput.authors,
    team: ideaInput.team,
    created_at: nowISO(),
  };
  const newData = {
    ...data,
    ideas: [...data.ideas, newIdea],
  };
  saveData(newData);
  return { data: newData, newIdea };
}

export function updateIdeaStatus(data, ideaId, newStatus) {
  const newData = {
    ...data,
    ideas: data.ideas.map((idea) =>
      idea.id === ideaId ? { ...idea, status: newStatus } : idea
    ),
  };
  saveData(newData);
  return newData;
}

export function getIdeasByTeam(data, team) {
  if (team === 'all') return data.ideas;
  return data.ideas.filter((i) => i.team === team);
}

export function getInitiativesByTeam(data, team) {
  if (team === 'all') return data.initiatives;
  return data.initiatives.filter((i) => i.team_id === team);
}

export function getInitiativesByTeamAndStatus(data, team, status) {
  return getInitiativesByTeam(data, team).filter((i) => i.status === status);
}

export function getInitiativeById(data, initiativeId) {
  return data.initiatives.find((i) => i.id === initiativeId);
}

export function moveInitiative(data, initiativeId, newStatus, changedByUserId, notes = '') {
  const initiative = data.initiatives.find((i) => i.id === initiativeId);
  if (!initiative) return data;

  const historyEntry = {
    id: generateId('sh'),
    initiative_id: initiativeId,
    from_status: initiative.status,
    to_status: newStatus,
    changed_by: changedByUserId,
    changed_at: nowISO(),
    notes,
  };

  const newData = {
    ...data,
    initiatives: data.initiatives.map((i) =>
      i.id === initiativeId ? { ...i, status: newStatus } : i
    ),
    statusHistory: [...data.statusHistory, historyEntry],
  };
  saveData(newData);
  return newData;
}

export function updateInitiativeStatus(data, initiativeId, newStatus) {
  const initiative = data.initiatives.find((i) => i.id === initiativeId);
  if (!initiative) return data;

  const newData = {
    ...data,
    initiatives: data.initiatives.map((i) =>
      i.id === initiativeId ? { ...i, status: newStatus } : i
    ),
  };
  saveData(newData);
  return newData;
}

export function getStatusHistory(data, initiativeId) {
  return data.statusHistory
    .filter((sh) => sh.initiative_id === initiativeId)
    .sort((a, b) => new Date(b.changed_at) - new Date(a.changed_at));
}

export function convertIdeaToInitiative(data, ideaId, team) {
  const idea = data.ideas.find((i) => i.id === ideaId);
  if (!idea) return data;

  // Generar código basado en equipo
  const teamCodes = {
    'Mantenimiento': 'MNT',
    'QA': 'QA',
    'Desarrollo': 'DEV',
  };
  const teamCode = teamCodes[team] || 'GEN';
  const nextCode = `${teamCode}-${String(data.initiatives.filter(i => i.team_id === team).length + 1).padStart(3, '0')}`;

  const newInitiative = {
    id: generateId('init'),
    code: nextCode,
    title: idea.title,
    name: idea.title,
    description: idea.proposed_solution,
    pain_point: idea.current_problem,
    expected_value: 'Por definir',
    status: 'Planificación',
    priority: 'Media',
    complexity: 'Media',
    team_id: team,
    source_idea_id: ideaId,
    start_date: nowISO(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: nowISO(),
    documents: [],
  };

  const newData = {
    ...data,
    ideas: data.ideas.map((i) =>
      i.id === ideaId ? { ...i, status: 'Convertida' } : i
    ),
    initiatives: [...data.initiatives, newInitiative],
  };
  saveData(newData);
  return newData;
}
