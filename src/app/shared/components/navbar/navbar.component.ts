import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { UserRoleService } from '../../../core/services/user-role.service';
import { Roles } from '../../constants/roles.constants';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  userRoleService = inject(UserRoleService);
  location = inject(Location);
  isLoggedIn: boolean = false;
  role: string = '';
  router = inject(Router);
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.isLoggedIn = this.userRoleService.getLoginStatus();
    this.role = this.userRoleService.getUserRole();
    this.updateMenuItems();

    this.authService.loginSuccess.subscribe({next: ()=> {
      this.isLoggedIn = this.userRoleService.getLoginStatus();
      this.role = this.userRoleService.getUserRole();
      this.updateMenuItems();
    }})
  }

  updateMenuItems() {
    this.items = [
      {
        label: 'Admins',
        icon: 'pi pi-fw pi-users',
        visible: this.role == Roles.superAdmin && this.isLoggedIn,
        routerLink: 'user/admins',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Players',
        icon: 'pi pi-fw pi-users',
        visible:
          (this.role === Roles.admin ||
          this.role === Roles.superAdmin) && this.isLoggedIn,
        routerLink: 'user/players',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-file',
        visible: this.isLoggedIn,
        routerLink: 'category/category-list',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Questions',
        icon: 'pi pi-fw pi-file',
        visible: this.role == Roles.admin && this.isLoggedIn,
        routerLink: 'question/question-list',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Leaderboard',
        icon: 'pi pi-fw pi-table',
        visible: this.isLoggedIn,
        routerLink: 'quiz/leaderboard',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Take Quiz',
        icon: 'pi pi-fw pi-pencil',
        visible: this.role == Roles.player && this.isLoggedIn,
        routerLink: 'quiz/play',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'My Scores',
        icon: 'pi pi-fw pi-history',
        visible: this.role == Roles.player && this.isLoggedIn,
        routerLink: 'quiz/scores',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        visible: this.isLoggedIn,
        routerLink: 'user/profile',
        routerLinkActiveOptions: { exact: true }
      },
    ];
  }

  register() {
    this.router.navigateByUrl('auth/register');
  }

  login() {
    this.router.navigateByUrl('auth/login');
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
    this.updateMenuItems();
  }

  matchUrlPath(path: string) {
    const url = this.router.url;
    return url.includes(path);
  }

  goToPreviousPage() {
    this.location.back();
  }
  goToNextPage() {
    this.location.forward();
  }
}
