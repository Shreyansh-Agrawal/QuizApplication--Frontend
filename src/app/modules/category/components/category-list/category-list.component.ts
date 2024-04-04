import { Component, OnInit, inject } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { UserRoleService } from '../../../../core/services/user-role.service';
import { Router } from '@angular/router';
import { Roles } from '../../../../shared/constants/roles.constants';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  editMode = false;
  showCategoryForm = false;
  categoryService = inject(CategoryService);
  userRoleService = inject(UserRoleService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);
  categories: Category[] | undefined;
  router = inject(Router);
  category: Category = { category_name: '', category_id: '', admin_id: '' };
  userRole = this.userRoleService.getUserRole();
  
  ngOnInit() {
    this.getAllCategories();
    this.categoryService.successSubject.subscribe({
      next: (res) => {
        this.getAllCategories();
      },
    });
  }

  userRoleIsAdmin() {
    if (this.userRole == Roles.admin) return true;
    return false;
  }

  getAllCategories() {
    this.categoryService.getAllCategories();
    this.categoryService.categoryList.subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
  }

  selectCategory(category: Category) {
    console.log(category);
    const role = this.userRoleService.getUserRole();

    switch (role) {
      case Roles.superAdmin:
        // nothing happens, he can only view
        break;
      case Roles.admin:
        // nothing happens on clicking
        // have a update and delete icon visible only to admin
        break;
      case Roles.player:
        // display a popup to select question type and confirmation to start
        // !instead of navigating, call a quiz service to start a quiz with selected params!
        this.router.navigateByUrl('/quiz/play');
        // don't call the quiz service in on init, have a btn and on click quiz starts
        break;

      default:
        break;
    }
  }

  openUpdateCategoryForm(category: Category) {
    this.editMode = true;
    this.showCategoryForm = true;
    this.category = category;
  }

  openCreateCategoryForm() {
    this.editMode = false;
    this.showCategoryForm = true;
  }

  closeCategoryForm() {
    this.showCategoryForm = false;
  }

  handleDeleteCategory(category: Category) {
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: `Note: All its questions will also be deleted!`,
      header: `Are you sure you want to permanently delete: ${category?.category_name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.categoryService.deleteCategory(category.category_id);
        this.categoryService.successSubject.subscribe({
          next: (res) => {
            this.getAllCategories();
          },
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
