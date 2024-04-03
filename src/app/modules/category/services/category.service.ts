import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/category.model';
import { APIResponse } from '../../../shared/models/api-response.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);
  messageService = inject(MessageService);
  isLoading = false;
  categoryList = new Subject<Category[]>();

  getAllCategories() {
    this.isLoading = true;
    this.http
      .get<APIResponse<Category[]>>(`${this.baseURL}/categories`)
      .subscribe({
        next: (res) => {
          this.categoryList.next(res.data);
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: err.error.message,
            detail: '',
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  createCategory(categoryName: string) {
    this.http.post(`${this.baseURL}/categories`, categoryName).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: err.error.message,
          detail: '',
        });
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
          this.messageService.add({
            severity: 'error',
            summary: err.error.message,
            detail: '',
          });
        },
      });
  }

  deleteCategory(categoryId: string) {
    this.http.delete(`${this.baseURL}/categories/${categoryId}`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: err.error.message,
          detail: '',
        });
      },
    });
  }
}
