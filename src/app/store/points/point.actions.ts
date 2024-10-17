import { createAction, props } from '@ngrx/store';
import { Point } from '../../core/models/point.model';

export const fetchPoints = createAction('[Points API] Fetch Points');

export const fetchPointsSuccess = createAction(
  '[Points API] Fetch Points Success',
  props<{ readonly points: Point[] }>()
);

export const fetchPointsFailure = createAction(
  '[Points API] Fetch Points Failure',
  props<{ readonly error: any }>()
);
