import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {Auth, onAuthStateChanged} from "@angular/fire/auth";

export const authenticationGuard = () => {
  return new Promise((resolve, reject) => {
    const router = inject(Router);
    const firebaseAuth = inject(Auth);
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        resolve(true);
      } else {
        console.log('User is not logged in, redirected to home screen');
        router.navigate(['']);
        resolve(false);
      }
    });
  });
}
