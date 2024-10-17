import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { PointState } from './PointState';
import {
  fetchPoints,
  fetchPointsFailure,
  fetchPointsSuccess,
} from './point.actions';

const initialState: PointState = AppInitialState.point;

export const pointReducers = createReducer(
  initialState,
  on(fetchPoints, (state) => ({ ...state, loading: true })),
  on(fetchPointsSuccess, (state, { points }) => ({
    ...state,
    points,
    loading: false,
  })),
  on(fetchPointsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
