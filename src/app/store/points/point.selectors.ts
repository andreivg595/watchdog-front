import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PointState } from './PointState';
import { PointType } from '../../core/enums/point-type.enum';

export const selectPointStete = createFeatureSelector<PointState>('point');

export const getPoints = createSelector(
  selectPointStete,
  (state) => state.points
);

export const getPointsByType = (type: string) =>
  createSelector(selectPointStete, (state) => {
    switch (type) {
      case PointType.PARK:
        return state.parks;
      case PointType.BEACH:
        return state.beaches;
      case PointType.VET:
        return state.vets;
      case PointType.FOUNTAIN:
        return state.fountains;
      default:
        return state.parks;
    }
  });
