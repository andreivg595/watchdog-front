import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { login, loginFailure, loginSuccess } from './login.actions';
import { AuthResponse } from '../../core/models/auth-response';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((authResponse: AuthResponse) => loginSuccess({ authResponse })),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );
}
