import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryCardComponent } from './components/category-list/category-card/category-card.component';
import { CreateCategoryComponent } from './components/category-list/create-category/create-category.component';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryCardComponent,
    CreateCategoryComponent,
  ],
  imports: [CommonModule, SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
