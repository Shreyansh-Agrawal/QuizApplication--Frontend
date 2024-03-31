import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../shared/models/Category';
import { APIResponse } from '../../shared/models/APIResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);

  categoryList = new Subject<Category[]>()

  getAllCategories() {
    this.http
      .get<APIResponse<Category[]>>(`${this.baseURL}/categories`)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.categoryList.next(res.data)
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  createCategory(categoryName: string) {
    this.http
      .post(`${this.baseURL}/categories`, categoryName)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateCategory(categoryId: string, categoryName: string) {
    this.http
      .put(`${this.baseURL}/categories/${categoryId}`, categoryName)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteCategory(categoryId: string) {
    this.http
      .delete(`${this.baseURL}/categories/${categoryId}`)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
