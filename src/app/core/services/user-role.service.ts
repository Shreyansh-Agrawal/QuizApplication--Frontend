import { Injectable } from '@angular/core';
import { TokenPayload } from '../../shared/models/token-payload.model';
import { jwtDecode } from 'jwt-decode';
import { Roles } from '../../shared/constants/roles.constants';

const RoleMapping = {
  superAdmin: 'SFAB6c',
  admin: 'SHVpHQ',
  player: 'SSwYVW',
};

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  getAccessToken() {
    const access_token = sessionStorage.getItem('access_token');
    return access_token;
  }

  getLoginStatus() {
    const access_token = this.getAccessToken();
    if (!access_token) return false;
    return true;
  }

  getUserRole() {
    const access_token = this.getAccessToken();
    if (!access_token) return '';
    const payload: TokenPayload = jwtDecode(access_token);

    return this.getRoleFromMapping(payload.cap);
  }

  getRoleFromMapping(mappedRole: string) {
    switch (mappedRole) {
      case RoleMapping.superAdmin:
        return Roles.superAdmin;
      case RoleMapping.admin:
        return Roles.admin;
      case RoleMapping.player:
        return Roles.player;
      default:
        return Roles.unknown;
    }
  }
}
