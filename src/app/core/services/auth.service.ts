import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../shared/models/user';

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
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');

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
}
