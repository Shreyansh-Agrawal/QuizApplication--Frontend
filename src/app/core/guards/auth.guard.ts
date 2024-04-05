import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userRoleService = inject(UserRoleService);
  const router = inject(Router);
  if (!userRoleService.getLoginStatus()) router.navigateByUrl('/auth/login');

  return true;
};
