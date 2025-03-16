import { createAction, props } from '@ngrx/store';
import { AuthResponse } from '../../core/models/auth-response';

export const login = createAction(
  '[Login Page] Login',
  props<{ readonly username: string; readonly password: string }>()
);

export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{ readonly authResponse: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Login API] Login Failure',
  props<{ readonly error: any }>()
);

export const logout = createAction('[Login Page] Logout');
