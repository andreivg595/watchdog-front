import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { register, registerFailure, registerSuccess } from './register.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ username, email, password, confirmPassword }) =>
        this.authService.register(username, email, password, confirmPassword).pipe(
          map((user) => registerSuccess({ user })),
          catchError((error) => of(registerFailure({ error })))
        )
      )
    )
  );
}
