import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const token = auth.getTokenSync();
  return token ? true : router.parseUrl('/login');
};