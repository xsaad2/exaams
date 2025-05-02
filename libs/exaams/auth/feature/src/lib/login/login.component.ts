import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '@com.language.exams/exaams/auth/data-access';
import {
  AtomicButtonComponent,
  AtomicIconComponent,
  AtomicInputComponent,
} from '@com.language.exams/shared/atomic-components';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { getReadableFirebaseError } from '@com.language.exams/exaams/auth/utils';
import { AtomicAlertComponent } from '@com.language.exams/shared/atomic-components';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [
    CommonModule,
    AtomicButtonComponent,
    ReactiveFormsModule,
    AtomicAlertComponent,
    AtomicIconComponent,
    AtomicInputComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthenticationService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  loginError = signal('');
  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailHasErrors() {
    return (
      (this.loginForm.get('email')?.invalid &&
        this.loginForm.get('email')?.touched &&
        this.loginForm.get('email')?.dirty) ??
      false
    );
  }
  get passwordHasErrors() {
    return (
      (this.loginForm.get('password')?.invalid &&
        this.loginForm.get('password')?.touched &&
        this.loginForm.get('password')?.dirty) ??
      false
    );
  }

  get emailErrorMessage() {
    if (this.loginForm.get('email')?.errors?.['required']) {
      return 'Email is required';
    }
    if (this.loginForm.get('email')?.errors?.['email']) {
      return 'Email is not valid';
    }
    return '';
  }

  get passwordErrorMessage() {
    if (this.loginForm.get('password')?.errors?.['required']) {
      return 'Password is required';
    }
    if (this.loginForm.get('password')?.errors?.['minlength']) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  onLoginWithGoogle() {
    this.authService.loginWithGooglePopUp();
  }

  onLoginWithEmail() {
    console.log(this.loginForm.getRawValue());
    this.authService
      .loginWithEmailAndPassword(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .catch((e) => {
        console.log(e);
        const readableError = getReadableFirebaseError(e.code);
        this.loginError.set(readableError);
      });
  }

  onSignUp() {
    this.router.navigate(['/auth/register']);
  }
}
