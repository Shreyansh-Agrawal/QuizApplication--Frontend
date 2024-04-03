import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginResponse } from '../models/login-response.model';
import { APIResponse } from '../../../shared/models/api-response.model';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { RefreshResponse } from '../models/refresh-response.model';
import { RegistrationForm } from '../models/register-form.model';
import { LoginForm } from '../models/login-form.model';


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
}
