import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';

export const playerGuard: CanActivateFn = (route, state) => {
  const userRoleService = inject(UserRoleService);
  return userRoleService.userRoleIsPlayer();
};
