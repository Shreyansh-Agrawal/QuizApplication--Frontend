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
  successSubject = new Subject<string>();
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
    const categoryData = { category_name: categoryName };
    this.http
      .post<APIResponse<void>>(`${this.baseURL}/categories`, categoryData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: res.message,
            detail: '',
          });
          this.successSubject.next('create');
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: err.error.message,
            detail: 'Try a different name',
          });
        },
      });
  }

  updateCategory(categoryId: string, categoryName: string) {
    const categoryData = { updated_category_name: categoryName };

    this.http
      .put<APIResponse<void>>(
        `${this.baseURL}/categories/${categoryId}`,
        categoryData
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: res.message,
            detail: '',
          });
          this.successSubject.next('update');
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
    this.http.delete<APIResponse<void>>(`${this.baseURL}/categories/${categoryId}`).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: res.message,
          detail: '',
        });
        this.successSubject.next('delete');
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
