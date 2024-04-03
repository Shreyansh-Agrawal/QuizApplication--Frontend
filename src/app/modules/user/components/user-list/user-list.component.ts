import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit{
  router = inject(Router)
  userService = inject(UserService)

  users: User[] = [];

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
