import { HttpInterceptorFn } from '@angular/common/http';
import { getAuth } from '@angular/fire/auth';
import { from, switchMap, take } from 'rxjs';

export const firebaseInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log('Firebase Interceptor', user);

  if (user) {
    return from(user.getIdToken()).pipe(
      take(1),
      switchMap((token) => {
        console.log('Token from interceptor', token);
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(clonedRequest);
      })
    );
  }

  return next(req);
};
