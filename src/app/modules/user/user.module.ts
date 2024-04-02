import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateAdminComponent } from './components/user-list/create-admin/create-admin.component';

@NgModule({
  declarations: [UserListComponent, UserProfileComponent, CreateAdminComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
