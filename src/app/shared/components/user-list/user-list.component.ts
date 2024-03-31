import { Component, inject } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  router = inject(Router)
  userService = inject(UserService)

  users: User[] = [
    {
      user_id: 'ABHrBm',
      username: 'matty',
      name: 'Mathew Murdock',
      email: 'matty@example.com',
      registration_date: '2024-02-10',
    },
    {
      user_id: 'ABHrBm',
      username: 'matty',
      name: 'Mathew Murdock',
      email: 'matty@example.com',
      registration_date: '2024-02-10',
    },
    {
      user_id: 'ABHrBm',
      username: 'matty',
      name: 'Mathew Murdock',
      email: 'matty@example.com',
      registration_date: '2024-02-10',
    },
  ];

  ngOnInit() {
    const url = this.router.url;
    if(url.includes('player')) {
      this.userService.getAllPlayers();
    }
    else if(url.includes('admin')) {
      this.userService.getAllAdmins();
    }

    this.userService.users.subscribe({
      next: (res) => {
        this.users = res
      }
    })
  }
}
