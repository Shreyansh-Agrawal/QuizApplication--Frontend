import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  loading = false;
  authService = inject(AuthService);
  router = inject(Router);

  register() {
    this.loading = true;
    const user_data = this.form?.value;
    delete user_data['confirm-password'];
    this.authService.register(user_data);

    this.authService.successSubject.subscribe({
      next: (serviceName) => {
        if(serviceName == 'register') {
          this.loading = false;
          this.router.navigateByUrl('auth/login');
        }
      },
    });

    this.authService.errorSubject.subscribe({
      next: () => {
        this.loading = false;
      },
    });
  }
}
