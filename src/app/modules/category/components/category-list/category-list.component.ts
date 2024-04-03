import { Component, OnInit, inject } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { UserRoleService } from '../../../../core/services/user-role.service';
import { Router } from '@angular/router';
import { Roles } from '../../../../shared/constants/roles.constants';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoryService = inject(CategoryService);
  userRoleService = inject(UserRoleService);
  categories: Category[] | undefined;
  router = inject(Router);

  ngOnInit() {
    this.getAllCategories();
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

  handleUpdateCategory(category: Category) {
    alert(category.category_name);
  }

  handleDeleteCategory(category: Category) {
    confirm(
      `Are you sure you want to permanently delete category: ${category?.category_name}.
      Note: All its questions will also be deleted!`
    );
    this.categoryService.deleteCategory(category.category_id);
    this.getAllCategories()
  }
}
