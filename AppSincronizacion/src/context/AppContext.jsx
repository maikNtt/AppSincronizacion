// PARIDAD POWER APPS: Este contexto simula las variables globales de Power Apps:
// - varCurrentUser → Set(varCurrentUser, ...) en App.OnStart
// - currentScreen → Navigate() / Back() entre Screens
// - selectedArea → Set(varSelectedArea, ...) en un Dropdown.OnChange
// - La navegación por "stack" simula el comportamiento de Back() en Power Apps.

import { createContext, useReducer, useCallback } from 'react';
import { SCREENS } from '../utils/constants';

const AppContext = createContext(null);

const initialState = {
  currentUser: null,
  currentScreen: SCREENS.LOGIN,
  screenParams: {},
  selectedArea: 'all',
  navigationStack: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
        currentScreen: SCREENS.DASHBOARD,
        selectedArea: action.payload?.is_coe ? 'all' : action.payload?.team,
        navigationStack: [],
      };

    case 'NAVIGATE':
      return {
        ...state,
        currentScreen: action.payload.screen,
        screenParams: action.payload.params || {},
        navigationStack: [...state.navigationStack, {
          screen: state.currentScreen,
          params: state.screenParams,
        }],
      };

    case 'GO_BACK': {
      const stack = [...state.navigationStack];
      const previous = stack.pop();
      if (!previous) return state;
      return {
        ...state,
        currentScreen: previous.screen,
        screenParams: previous.params || {},
        navigationStack: stack,
      };
    }

    case 'SET_SELECTED_AREA':
      return {
        ...state,
        selectedArea: action.payload,
      };

    case 'LOGOUT':
      return { ...initialState };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setCurrentUser = useCallback((user) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  }, []);

  const navigate = useCallback((screen, params = {}) => {
    dispatch({ type: 'NAVIGATE', payload: { screen, params } });
  }, []);

  const goBack = useCallback(() => {
    dispatch({ type: 'GO_BACK' });
  }, []);

  const setSelectedArea = useCallback((area) => {
    dispatch({ type: 'SET_SELECTED_AREA', payload: area });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = {
    ...state,
    setCurrentUser,
    navigate,
    goBack,
    setSelectedArea,
    logout,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
