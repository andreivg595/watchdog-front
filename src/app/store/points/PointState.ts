import { Point } from '../../core/models/point.model';

export interface PointState {
  points: Point[];
  loading: boolean;
  error: any;
}
