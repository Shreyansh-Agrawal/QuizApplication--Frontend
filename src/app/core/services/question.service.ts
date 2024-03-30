import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);

  getQuizData(categoryId: string) {
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('category_id', categoryId);
    }
    this.http
      .get(`${this.baseURL}/categories/questions`, { params })
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  postQuizData(quizData: any) {
    // todo: create a model for quizData
    this.http
      .post(`${this.baseURL}/categories/questions`, quizData)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  createQuestion(categoryId: string, questionData: any) {
    this.http
      .post(`${this.baseURL}/categories/${categoryId}/questions`, questionData)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  updateQuestion(questionId: string, questionText: string) {
    this.http
      .put(`${this.baseURL}/categories/questions/${questionId}`, questionText)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteQuestion(questionId: string) {
    this.http
      .delete(`${this.baseURL}/categories/questions/${questionId}`)
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