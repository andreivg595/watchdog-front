import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PointService } from '../../core/services/point.service';
import {
  fetchPoints,
  fetchPointsFailure,
  fetchPointsSuccess,
} from './point.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class PointEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pointService: PointService
  ) {}

  fetchPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPoints),
      switchMap(() =>
        this.pointService.getPoints().pipe(
          map((points) => fetchPointsSuccess({ points })),
          catchError((error) => of(fetchPointsFailure({ error })))
        )
      )
    )
  );
}
