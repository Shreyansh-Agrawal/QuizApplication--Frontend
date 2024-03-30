import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = true;
  role = 'admin';

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Admins',
        icon: 'pi pi-fw pi-users',
        visible: this.role == 'super-admin' && this.isLoggedIn,
        routerLink: 'users'
      },
      {
        label: 'Players',
        icon: 'pi pi-fw pi-users',
        visible: this.role === 'admin' || this.role === 'super-admin' && this.isLoggedIn,
        routerLink: 'users'
      },
      {
        label: 'Categories',
        icon: 'pi pi-fw pi-file',
        routerLink: 'categories'
      },
      {
        label: 'Questions',
        icon: 'pi pi-fw pi-file',
        visible: this.role == 'admin' && this.isLoggedIn,
        routerLink: 'admin/questions'
      },
      {
        label: 'Leaderboard',
        icon: 'pi pi-fw pi-table',
        routerLink: 'leaderboard'
      },
      {
        label: 'Take Quiz',
        icon: 'pi pi-fw pi-pencil',
        visible: this.role == 'player' && this.isLoggedIn,
        routerLink: 'player/quiz'
      },
      {
        label: 'My Scores',
        icon: 'pi pi-fw pi-history',
        visible: this.role == 'player' && this.isLoggedIn,
        routerLink: 'player/scores'
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        visible: this.isLoggedIn,
        routerLink: 'profile'
      },
    ];
  }
}
