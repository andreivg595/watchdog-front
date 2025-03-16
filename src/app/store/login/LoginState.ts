import { User } from '../../core/models/user.model';

export interface LoginState {
  token: string | null;
  username: string | null;
  error: any;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
}
