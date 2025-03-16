import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<User> {
    return this.http.post<User>(`${this.url}/auth/register`, {
      username,
      email,
      password,
      confirmPassword,
    });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/auth/login`, {
      username,
      password,
    });
  }

  getToken(): string | null {
    const state = JSON.parse(localStorage.getItem('state') || '{}');
    return state.token;
  }
}
