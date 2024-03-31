import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  authService = inject(AuthService)

  register() {
    const user_data = this.form?.value;
    this.authService.register(user_data)
  }
}
