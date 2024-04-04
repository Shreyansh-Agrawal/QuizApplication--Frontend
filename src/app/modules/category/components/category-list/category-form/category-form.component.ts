import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CreateCategoryComponent {
  @Input() category: Category = {
    category_name: 'Science',
    category_id: '',
    admin_id: '',
  };
  @Input() editMode = false;
  @Output() closeForm = new EventEmitter<boolean>();
  categoryService = inject(CategoryService);

  closeCategoryForm() {
    this.closeForm.emit(false);
  }

  updateCategory(category: Category) {
    this.categoryService.updateCategory(
      category.category_id,
      category.category_name
    );
    this.categoryService.successSubject.subscribe(() => {
      this.closeCategoryForm();
    });
  }

  createCategory(category: Category) {
    this.categoryService.createCategory(category.category_name);
    this.categoryService.successSubject.subscribe(() => {
      this.closeCategoryForm();
    });
  }
}
