import { AppState } from './AppState';

export const AppInitialState: AppState = {
  register: {
    error: null,
    isRegistered: false,
    isRegistering: false,
  },
  login: {
    token: null,
    username: null,
    error: null,
    isLoggedIn: false,
    isLoggingIn: false,
  },
  point: {
    points: [],
    parks: [],
    beaches: [],
    vets: [],
    fountains: [],
    loading: false,
    error: null,
  },
};
