import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { RegisterState } from './RegisterState';
import { register, registerFailure, registerSuccess } from './register.actions';

const initialState: RegisterState = AppInitialState.register;

export const registerReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    error: null,
    isRegistered: false,
    isRegistering: true,
  })),
  on(registerSuccess, (state) => ({
    ...state,
    isRegistered: true,
    isRegistering: false,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
    isRegistered: false,
    isRegistering: false,
  }))
);
