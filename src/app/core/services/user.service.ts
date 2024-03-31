import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../shared/models/user';
import { Subject } from 'rxjs';
import { APIResponse } from '../../shared/models/APIResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);

  users = new Subject<User[]>()

  getUserProfile() {
    this.http.get(`${this.baseURL}/profile/me`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllPlayers() {
    this.http.get<APIResponse<User[]>>(`${this.baseURL}/players`).subscribe({
      next: (res) => {
        console.log(res);
        this.users.next(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllAdmins() {
    this.http.get<APIResponse<User[]>>(`${this.baseURL}/admins`).subscribe({
      next: (res) => {
        console.log(res);
        this.users.next(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createAdmin(adminData: User) {
    this.http.post(`${this.baseURL}/admins`, adminData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUserProfile(userData: User) {
    this.http.put(`${this.baseURL}/profile/me`, userData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUserPassword(userCredentials: any) {
    this.http.put(`${this.baseURL}/profile/me`, userCredentials).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteAdmin(adminId: string) {
    this.http.delete(`${this.baseURL}/admins/${adminId}`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePlayer(playerId: string) {
    this.http.delete(`${this.baseURL}/players/${playerId}`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
