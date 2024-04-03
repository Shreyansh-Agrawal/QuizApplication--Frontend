import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../models/login-response.model';
import { APIResponse } from '../../../shared/models/api-response.model';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { RefreshResponse } from '../models/refresh-response.model';
import { RegistrationForm } from '../models/register-form.model';
import { LoginForm } from '../models/login-form.model';
import { TokenPayload } from '../models/token-payload.model';

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
  messageService = inject(MessageService)
  loginSuccess = new Subject<void>();
  successSubject = new Subject<string>();
  errorSubject = new Subject<void>();
  refreshIntervalId: number = 0;

  constructor(private http: HttpClient) {
    this.refresh = this.refresh.bind(this);
  }
  register(userData: RegistrationForm) {
    this.http
      .post<APIResponse<void>>(`${this.baseURL}/register`, userData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: res.message, detail: 'Please log in...' });
          this.successSubject.next('register');
        },
        error: (err) => {
          console.log(err);
          this.errorSubject.next();
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
        },
      });
  }

  login(loginData: LoginForm) {
    this.http
      .post<APIResponse<LoginResponse>>(`${this.baseURL}/login`, loginData)
      .subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: res.message, detail: 'Welcome to SmartQuiz' });

          const { access_token, refresh_token, password_type } = res.data;
          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('refresh_token', refresh_token);
          this.loginSuccess.next();
          this.refreshIntervalId = setInterval(this.refresh, 14*60*1000);
        },
        error: (err) => {
          console.log(err);
          this.errorSubject.next();
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: 'Try different credentials or sign up...' });
        },
      });
  }

  logout() {
    this.http
      .post<APIResponse<void>>(`${this.baseURL}/logout`, null)
      .subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: res.message });
          clearInterval(this.refreshIntervalId);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
        },
      });

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
  }

  refresh() {
    console.log('refresh func called');
    
    this.http
      .post<APIResponse<RefreshResponse>>(`${this.baseURL}/refresh`, null)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          const { access_token, refresh_token } = res.data;
          sessionStorage.setItem('access_token', access_token);
          sessionStorage.setItem('refresh_token', refresh_token);
          console.log('new access token set');

        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
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
    if (!access_token) return '';
    const payload: TokenPayload = jwtDecode(access_token);
    
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
