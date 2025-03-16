import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { LoginState } from './LoginState';
import { login, loginFailure, loginSuccess, logout } from './login.actions';

const initialState: LoginState = AppInitialState.login;

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    error: null,
    isLoggedIn: false,
    isLoggingIn: true,
  })),
  on(loginSuccess, (state, { authResponse }) => ({
    ...state,
    token: authResponse.token,
    username: authResponse.username,
    isLoggedIn: true,
    isLoggingIn: false,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    isLoggingIn: false,
    error,
  })),
  on(logout, () => initialState)
);
