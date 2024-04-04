import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserRoleService } from '../../../../../core/services/user-role.service';
import { Roles } from '../../../../../shared/constants/roles.constants';
import { Category } from '../../../models/category.model';


@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() category: Category | undefined;
  @Output() updateEvent = new EventEmitter<Category>();
  @Output() deleteEvent = new EventEmitter<Category>();

  userRoleService = inject(UserRoleService);
  userRole = this.userRoleService.getUserRole();
  
  userRoleIsAdmin() {
    if (this.userRole == Roles.admin) return true;
    return false;
  }
  
  userRoleIsPlayer() {
    if (this.userRole == Roles.player) return true;
    return false;
  }
}
