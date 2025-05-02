import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  user,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  firebaseAuth = inject(Auth);
  private googleProvider = new GoogleAuthProvider();
  private readonly router = inject(Router);

  user$ = user(this.firebaseAuth);

  loginWithGooglePopUp() {
    this.googleProvider.setCustomParameters({
      prompt: 'select_account',
    });
    signInWithPopup(this.firebaseAuth, this.googleProvider).then((r) =>
      this.router.navigate(['/dashboard'])
    );
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  logout() {
    this.firebaseAuth.signOut().then(
      () => {
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        console.error('Error signing out: ', error);
      }
    );
  }

  getProfilePicture() {
    return this.user$.pipe(map((user) => user?.photoURL));
  }
}
