import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { PointState } from './PointState';
import {
  fetchPoints,
  fetchPointsFailure,
  fetchPointsSuccess,
} from './point.actions';
import { PointType } from '../../core/enums/point-type.enum';

const initialState: PointState = AppInitialState.point;

export const pointReducers = createReducer(
  initialState,
  on(fetchPoints, (state) => ({ ...state, loading: true })),
  on(fetchPointsSuccess, (state, { points }) => ({
    ...state,
    points,
    parks: points.filter((point) => point.type === PointType.PARK),
    beaches: points.filter((point) => point.type === PointType.BEACH),
    vets: points.filter((point) => point.type === PointType.VET),
    fountains: points.filter((point) => point.type === PointType.FOUNTAIN),
    loading: false,
  })),
  on(fetchPointsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
