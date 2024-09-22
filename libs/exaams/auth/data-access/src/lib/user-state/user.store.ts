import { User } from 'firebase/auth';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthenticationService } from '../authentication.service';

type UserState = {
  user: User | null,
  isLoading: boolean,
}

const initialState: UserState = {
  user: null,
  isLoading: false
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.user() !== null)
  })),
  withMethods((store, authService = inject(AuthenticationService)) => ({
      async loadCurrentUser() {
        patchState(store, { isLoading: true });
        await authService.firebaseAuth.authStateReady();
        authService.user$.subscribe(user =>
          patchState(store, { user: user, isLoading: false }))
      }
    })
  ),
  withHooks({
    onInit({ loadCurrentUser }) {
      loadCurrentUser();
    },
    onDestroy() {
      console.log('destroyed');
    }
  })
);
