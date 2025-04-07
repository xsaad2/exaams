import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithPopup,
  user,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  firebaseAuth = inject(Auth);
  private googleProvider = new GoogleAuthProvider();

  user$ = user(this.firebaseAuth);

  login() {
    signInWithPopup(this.firebaseAuth, this.googleProvider).then((r) =>
      console.log(r)
    );
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  getProfilePicture() {
    return this.user$.pipe(map((user) => user?.photoURL));
  }
}
