import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PointState } from './PointState';

export const selectPointStete = createFeatureSelector<PointState>('point');

export const getPoints = createSelector(
  selectPointStete,
  (state) => state.points
);
