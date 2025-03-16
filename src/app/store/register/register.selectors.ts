import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from './RegisterState';

export const selectRegisterState =
  createFeatureSelector<RegisterState>('register');

export const getRegister = createSelector(
  selectRegisterState,
  (state) => state
);
