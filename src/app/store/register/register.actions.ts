import { createAction, props } from '@ngrx/store';
import { User } from '../../core/models/user.model';

export const register = createAction(
  '[Register Page] Register',
  props<{
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly confirmPassword: string;
  }>()
);

export const registerSuccess = createAction(
  '[Register API] Register Success',
  props<{ readonly user: User }>()
);

export const registerFailure = createAction(
  '[Register API] Register Failure',
  props<{ readonly error: any }>()
);
