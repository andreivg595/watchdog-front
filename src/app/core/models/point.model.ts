import { User } from './user.model';

export interface Point {
  id: number;
  name: string;
  address: string;
  type: string;
  latitude: number;
  longitude: number;
  status: string;
  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  createdBy: User;
  updatedBy: User;
  aprovedBy: User;
}
