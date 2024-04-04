import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: NgForm | undefined;
  @ViewChild('passwordForm') passwordForm: NgForm | undefined;
  loadingUpdateProfile = false;
  loadingUpdatePassword = false;
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
    this.loadingUpdateProfile = true;

    this.userData = this.profileForm?.value;
    this.userService.updateUserProfile(this.userData);
    this.userService.successSubject.subscribe({
      next: () => {
        this.loadingUpdateProfile = false;
      },
    });
    this.userService.errorSubject.subscribe({
      next: () => {
        this.loadingUpdateProfile = false;
      },
    });
  }

  updatePassword() {
    this.loadingUpdatePassword = true;

    const userCredentials = this.passwordForm?.value;
    this.userService.updateUserPassword(userCredentials);
    this.userService.successSubject.subscribe({
      next: () => {
        this.loadingUpdatePassword = false;
      },
    });
    this.userService.errorSubject.subscribe({
      next: () => {
        this.loadingUpdatePassword = false;
      },
    });
  }
}
