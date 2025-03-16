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
import { register } from '../../../store/register/register.actions';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  onRegister(): void {
    const { username, email, password, confirmPassword } =
      this.registerForm.value;
    if (
      this.registerForm.valid &&
      username &&
      email &&
      password &&
      confirmPassword
    )
      this.store.dispatch(
        register({ username, email, password, confirmPassword })
      );
  }
}
