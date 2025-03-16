import { LoginState } from './login/LoginState';
import { PointState } from './points/PointState';
import { RegisterState } from './register/RegisterState';

export interface AppState {
  register: RegisterState;
  login: LoginState;
  point: PointState;
}
