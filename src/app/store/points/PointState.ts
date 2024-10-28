import { Point } from '../../core/models/point.model';

export interface PointState {
  points: Point[];
  parks: Point[];
  beaches: Point[];
  vets: Point[];
  fountains: Point[];
  loading: boolean;
  error: any;
}
