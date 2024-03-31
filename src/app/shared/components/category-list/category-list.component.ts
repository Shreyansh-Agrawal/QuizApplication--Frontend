import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categoryService = inject(CategoryService);
  categories: Category[] | undefined

  ngOnInit() {
    console.log('ng on init category comp');
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
