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
  isLoggedIn: boolean = this.authService.getLoginStatus();
  role = this.authService.getUserRole();
  router = inject(Router);
  items: MenuItem[] | undefined;

  // todo: when logging out, the items are not changing dynamically
  ngOnInit() {
    this.items = [
      {
        label: 'Admins',
        icon: 'pi pi-fw pi-users',
        visible: this.role == 'super-admin' && this.isLoggedIn,
        routerLink: 'admins',
      },
      {
        label: 'Players',
        icon: 'pi pi-fw pi-users',
        visible:
          this.role === 'admin' ||
          (this.role === 'super-admin' && this.isLoggedIn),
        routerLink: 'players',
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-file',
        visible: this.isLoggedIn,
        routerLink: 'categories',
      },
      {
        label: 'Questions',
        icon: 'pi pi-fw pi-file',
        visible: this.role == 'admin' && this.isLoggedIn,
        routerLink: 'admin/questions',
      },
      {
        label: 'Leaderboard',
        icon: 'pi pi-fw pi-table',
        visible: this.isLoggedIn,
        routerLink: 'leaderboard',
      },
      {
        label: 'Take Quiz',
        icon: 'pi pi-fw pi-pencil',
        visible: this.role == 'player' && this.isLoggedIn,
        routerLink: 'player/quiz',
      },
      {
        label: 'My Scores',
        icon: 'pi pi-fw pi-history',
        visible: this.role == 'player' && this.isLoggedIn,
        routerLink: 'player/scores',
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        visible: this.isLoggedIn,
        routerLink: 'profile',
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
  }
}
