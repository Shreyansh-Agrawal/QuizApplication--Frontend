import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../shared/models/user';
import { jwtDecode } from 'jwt-decode';
import { LoginData } from '../../shared/models/loginData';
import { APIResponse } from '../../shared/models/APIResponse';

const RoleMapping = {
  SUPER_ADMIN: 'SFAB6c',
  ADMIN: 'SHVpHQ',
  PLAYER: 'SSwYVW'
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);

  register(userData: User) {
    this.http
      .post(`${this.baseURL}/register`, userData)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  login(loginData: User) {
    this.http
      .post<APIResponse<LoginData>>(`${this.baseURL}/login`, loginData)
      .subscribe({
        next: (res) => {
          const { access_token, refresh_token, password_type } = res.data;
          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('refresh_token', refresh_token);

          console.log(`Logged in success, password type: ${password_type}`);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  logout() {
    this.http
      .post(`${this.baseURL}/logout`, null)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }

  refresh() {
    this.http
      .post<APIResponse<LoginData>>(`${this.baseURL}/refresh`, null)
      .subscribe({
        next: (res) => {
          const { access_token } = res.data;
          sessionStorage.setItem('access_token', access_token);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

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
    if (!access_token) return false;
    const payload: any = jwtDecode(access_token);
    
    return this.getRoleFromMapping(payload.cap)
  }

  getRoleFromMapping(mappedRole: string) {
    switch(mappedRole) {
      case RoleMapping.SUPER_ADMIN:
          return 'super-admin';
      case RoleMapping.ADMIN:
          return 'admin';
      case RoleMapping.PLAYER:
          return 'player';
      default:
          return 'Unknown role';
    }
  }
}
