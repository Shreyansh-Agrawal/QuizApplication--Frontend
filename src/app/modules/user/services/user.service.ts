import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { APIResponse } from '../../../shared/models/api-response.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);
  messageService = inject(MessageService)
  isLoading = false;
  users = new Subject<User[]>()
  profile = new Subject<User>()

  getUserProfile() {
    this.isLoading = true;
    this.http.get<APIResponse<User>>(`${this.baseURL}/profile/me`).subscribe({
      next: (res) => {
        this.profile.next(res.data);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getAllPlayers() {
    this.isLoading = true;
    this.http.get<APIResponse<User[]>>(`${this.baseURL}/players`).subscribe({
      next: (res) => {
        this.users.next(res.data);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getAllAdmins() {
    this.isLoading = true;
    this.http.get<APIResponse<User[]>>(`${this.baseURL}/admins`).subscribe({
      next: (res) => {
        this.users.next(res.data);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
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
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
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
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
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
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
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
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
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
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
    });
  }
}
