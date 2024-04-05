import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { superAdminGuard } from '../../core/guards/super-admin.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { adminSuperAdminGuard } from '../../core/guards/admin-super-admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admins',
        component: UserListComponent,
        canActivate: [superAdminGuard],
      },
      {
        path: 'players',
        component: UserListComponent,
        canActivate: [adminSuperAdminGuard],
      },
      { path: 'profile', component: UserProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
