import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageKeys } from '../constants/local-storage-keys';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (token) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
