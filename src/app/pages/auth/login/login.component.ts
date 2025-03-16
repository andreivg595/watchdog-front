import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AppState } from '../../../store/AppState';
import { Store } from '@ngrx/store';
import { login } from '../../../store/login/login.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  onLogin(): void {
    const { username, password } = this.loginForm.value;
    if (this.loginForm.valid && username && password)
      this.store.dispatch(login({ username, password }));
  }
}
