import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageKeys } from '../constants/local-storage-keys';

export const recipesGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageKeys.TOKEN);

  if (token) return true;

  router.navigateByUrl('login');
  return false;
};
