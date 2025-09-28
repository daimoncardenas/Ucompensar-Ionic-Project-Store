import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        void auth.logout();
        void router.navigateByUrl('/login', { replaceUrl: true });
      }
      return throwError(() => err);
    })
  );
};
