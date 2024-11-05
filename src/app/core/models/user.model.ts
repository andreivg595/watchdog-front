import { Point } from 'leaflet';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  deletedAt: Date;
  createdPoints: Point[];
  approvedPoints: Point[];
}
