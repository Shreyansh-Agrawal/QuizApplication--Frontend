import { Component, OnInit, inject } from '@angular/core';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoryService = inject(CategoryService);
  categories: Category[] | undefined

  ngOnInit() {
    this.categoryService.getAllCategories();
    this.categoryService.categoryList.subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
  }

  selectCategory(category: Category) {
    console.log(category);
  }
}
