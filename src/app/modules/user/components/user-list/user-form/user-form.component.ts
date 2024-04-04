import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  @Output() closeForm = new EventEmitter<boolean>();
  @ViewChild('userForm') form: NgForm | undefined;
  userService = inject(UserService);

  closeUserForm() {
    this.closeForm.emit(false);
  }

  createUser() {
    const userData = this.form?.value;
    this.userService.createAdmin(userData);

    this.userService.successSubject.subscribe({
      next: () => {
        this.closeUserForm();
      },
    });
  }
}
