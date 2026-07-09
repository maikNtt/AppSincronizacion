// PARIDAD POWER APPS: Este contexto simula las colecciones de datos de Power Apps.
// - ideas, initiatives, statusHistory → equivalen a las SharePoint Lists conectadas
// - Las funciones CRUD (addIdea, moveInitiative, etc.) equivalen a Patch() / Collect()
// - Los getters con filtros equivalen a Filter() / LookUp()

import { createContext, useReducer, useCallback } from 'react';
import * as dataService from '../utils/dataService';

const DataContext = createContext(null);

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...action.payload };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, null, () => dataService.loadData());

  const setData = useCallback((data) => {
    dispatch({ type: 'SET_DATA', payload: data });
  }, []);

  // === Ideas ===

  const addIdea = useCallback((ideaInput) => {
    const result = dataService.addIdea(state, ideaInput);
    setData(result.data);
    return result.newIdea;
  }, [state, setData]);

  const updateIdeaStatus = useCallback((ideaId, newStatus) => {
    const newData = dataService.updateIdeaStatus(state, ideaId, newStatus);
    setData(newData);
  }, [state, setData]);

  const convertIdeaToInitiative = useCallback((ideaId, team) => {
    const newData = dataService.convertIdeaToInitiative(state, ideaId, team);
    setData(newData);
  }, [state, setData]);

  const getIdeasByTeam = useCallback((team) => {
    return dataService.getIdeasByTeam(state, team);
  }, [state]);

  // === Initiatives ===

  const getInitiativesByTeam = useCallback((team) => {
    return dataService.getInitiativesByTeam(state, team);
  }, [state]);

  const getInitiativesByTeamAndStatus = useCallback((team, status) => {
    return dataService.getInitiativesByTeamAndStatus(state, team, status);
  }, [state]);

  const getInitiativeById = useCallback((id) => {
    return dataService.getInitiativeById(state, id);
  }, [state]);

  const moveInitiative = useCallback((initiativeId, newStatus, userId, notes) => {
    const newData = dataService.moveInitiative(state, initiativeId, newStatus, userId, notes);
    setData(newData);
  }, [state, setData]);

  const updateInitiativeStatus = useCallback((initiativeId, newStatus) => {
    const newData = dataService.updateInitiativeStatus(state, initiativeId, newStatus);
    setData(newData);
  }, [state, setData]);

  // === Status History ===

  const getStatusHistory = useCallback((initiativeId) => {
    return dataService.getStatusHistory(state, initiativeId);
  }, [state]);

  // === Users ===

  const getUsers = useCallback(() => {
    return dataService.getUsers(state);
  }, [state]);

  const getUserById = useCallback((userId) => {
    return dataService.getUserById(state, userId);
  }, [state]);

  const getUsersByTeam = useCallback((team) => {
    return dataService.getUsersByTeam(state, team);
  }, [state]);

  // === Reset ===

  const resetAllData = useCallback(() => {
    const freshData = dataService.resetData();
    setData(freshData);
  }, [setData]);

  const value = {
    ...state,
    addIdea,
    updateIdeaStatus,
    convertIdeaToInitiative,
    getIdeasByTeam,
    getInitiativesByTeam,
    getInitiativesByTeamAndStatus,
    getInitiativeById,
    moveInitiative,
    updateInitiativeStatus,
    getStatusHistory,
    getUsers,
    getUserById,
    getUsersByTeam,
    resetAllData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
