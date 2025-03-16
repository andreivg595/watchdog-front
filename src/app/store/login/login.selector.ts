import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './LoginState';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const getLogin = createSelector(selectLoginState, (state) => state);

export const getIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state.isLoggedIn
);

export const getToken = createSelector(
  selectLoginState,
  (state) => state.token
);

export const getUsername = createSelector(
  selectLoginState,
  (state) => state.username
);
