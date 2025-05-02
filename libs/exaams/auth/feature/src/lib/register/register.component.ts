import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AtomicButtonComponent,
  AtomicInputComponent,
} from '@com.language.exams/shared/atomic-components';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '@com.language.exams/exaams/auth/data-access';
import { Router } from '@angular/router';
import { AtomicAlertComponent } from '@com.language.exams/shared/atomic-components';
import { getReadableFirebaseError } from '@com.language.exams/exaams/auth/utils';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [
    CommonModule,
    AtomicButtonComponent,
    ReactiveFormsModule,
    AtomicAlertComponent,
    AtomicInputComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private authService = inject(AuthenticationService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  registerForm: FormGroup;
  registerError = signal('');
  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailHasErrors() {
    return (
      (this.registerForm.get('email')?.invalid &&
        this.registerForm.get('email')?.touched &&
        this.registerForm.get('email')?.dirty) ??
      false
    );
  }
  get passwordHasErrors() {
    return (
      (this.registerForm.get('password')?.invalid &&
        this.registerForm.get('password')?.touched &&
        this.registerForm.get('password')?.dirty) ??
      false
    );
  }

  get emailErrorMessage() {
    if (this.registerForm.get('email')?.errors?.['required']) {
      return 'Email is required';
    }
    if (this.registerForm.get('email')?.errors?.['email']) {
      return 'Email is not valid';
    }
    return '';
  }

  get passwordErrorMessage() {
    if (this.registerForm.get('password')?.errors?.['required']) {
      return 'Password is required';
    }
    if (this.registerForm.get('password')?.errors?.['minlength']) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  onRegister() {
    this.authService
      .createUserWithEmailAndPassword(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(() => this.router.navigate(['/dashboard']))
      .catch((error) => {
        console.log(error);
        const readableError = getReadableFirebaseError(error.code);
        this.registerError.set(readableError);
      });
  }

  onLoginWithGoogle() {
    this.authService.loginWithGooglePopUp();
  }
  onLogIn() {
    this.router.navigate(['/auth/login']);
  }
}
