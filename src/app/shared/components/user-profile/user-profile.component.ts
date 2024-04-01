import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  @ViewChild('profileForm') form: NgForm | undefined;
  loading = false;
  userService = inject(UserService);
  router = inject(Router);
  userData: User | undefined;
  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  registrationDate: string | undefined;

  ngOnInit() {
    this.userService.getUserProfile();
    this.userService.profile.subscribe({
      next: (res) => {
        this.userData = res;
        this.name = this.userData?.name;
        this.email = this.userData?.email;
        this.username = this.userData?.username;
        this.registrationDate = this.userData?.registration_date;
      },
    });
  }

  updateProfile() {
    console.log(this.registrationDate);
  }
}
