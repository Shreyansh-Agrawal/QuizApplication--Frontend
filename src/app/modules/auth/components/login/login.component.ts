import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginForm') form: NgForm | undefined;
  loading = false;
  authService = inject(AuthService);
  router = inject(Router);

  login() {
    this.loading = true;
    const loginData = this.form?.value;
    this.authService.login(loginData);

    this.authService.loginSuccess.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('quiz/leaderboard')
      },
    });

    this.authService.errorSubject.subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }
}
