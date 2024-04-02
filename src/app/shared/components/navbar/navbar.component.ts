import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  role: string = '';
  router = inject(Router);
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.isLoggedIn = this.authService.getLoginStatus();
    this.role = this.authService.getUserRole();
    this.updateMenuItems();

    this.authService.loginSuccess.subscribe({next: ()=> {
      this.isLoggedIn = this.authService.getLoginStatus();
      this.role = this.authService.getUserRole();
      this.updateMenuItems();
    }})
  }

  updateMenuItems() {
    this.items = [
      {
        label: 'Admins',
        icon: 'pi pi-fw pi-users',
        visible: this.role == 'super-admin' && this.isLoggedIn,
        routerLink: 'user/admins',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Players',
        icon: 'pi pi-fw pi-users',
        visible:
          (this.role === 'admin' ||
          this.role === 'super-admin') && this.isLoggedIn,
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
        visible: this.role == 'admin' && this.isLoggedIn,
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
        visible: this.role == 'player' && this.isLoggedIn,
        routerLink: 'quiz/play',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'My Scores',
        icon: 'pi pi-fw pi-history',
        visible: this.role == 'player' && this.isLoggedIn,
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
}
