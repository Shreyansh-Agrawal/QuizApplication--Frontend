import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Roles } from '../../../../shared/constants/roles.constants';
import { UserRoleService } from '../../../../core/services/user-role.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  showUserForm = false;
  router = inject(Router);
  userService = inject(UserService);
  userRoleService = inject(UserRoleService);
  userRole = this.userRoleService.getUserRole();
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  users: User[] = [];

  ngOnInit() {
    this.getAllUsers();
    this.userService.users.subscribe({
      next: (res) => {
        this.users = res;
      },
    });
    this.userService.successSubject.subscribe({
      next: () => {
        this.getAllUsers();
      }
    })
  }

  getAllUsers() {
    if (this.routeIsPlayerRoute()) {
      this.userService.getAllPlayers();
    } else if (this.routeIsAdminRoute()) {
      this.userService.getAllAdmins();
    }
  }

  userRoleIsAdmin() {
    if (this.userRole == Roles.admin) return true;
    return false;
  }

  userRoleIsSuperAdmin() {
    if (this.userRole == Roles.superAdmin) return true;
    return false;
  }

  routeIsAdminRoute() {
    const url = this.router.url;
    if (url.includes(Roles.admin)) return true;
    return false;
  }

  routeIsPlayerRoute() {
    const url = this.router.url;
    if (url.includes(Roles.player)) return true;
    return false;
  }

  openCreateUserForm() {
    this.showUserForm = true;
  }

  closeUserForm() {
    this.showUserForm = false;
  }

  handleDeleteUser(user: User) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: `Note: Deleted account cannot be restored!`,
      header: `Are you sure you want to permanently delete: ${user?.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        if (this.routeIsAdminRoute())
          this.userService.deleteAdmin(user.user_id);
        else if (this.routeIsPlayerRoute())
          this.userService.deletePlayer(user.user_id);
        this.userService.successSubject.subscribe({
          next: () => {
            this.getAllUsers();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'User not deleted',
          life: 3000,
        });
      },
    });
  }
}
