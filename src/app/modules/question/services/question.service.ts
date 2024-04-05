import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { APIResponse } from '../../../shared/models/api-response.model';
import { QuizData } from '../models/quiz-data.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);
  messageService = inject(MessageService);
  questionList = new Subject<QuizData[]>();
  successSubject = new Subject<string>();
  isLoading = false;

  getQuizDataForDownload() {
    this.http
      .get<APIResponse<QuizData[]>>(`${this.baseURL}/categories/questions`)
      .subscribe({
        next: (res) => {
          const data = JSON.stringify(res.data);
          console.log(data);
          this.downloadQuizData(data);
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

  downloadQuizData(data: string) {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(data)
    );
    element.setAttribute('download', 'quizData.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  getQuizData(categoryId?: string) {
    this.isLoading = true;
    let params = new HttpParams();
    if (categoryId) {
      params = params.set('category_id', categoryId);
    }
    this.http
      .get<APIResponse<QuizData[]>>(`${this.baseURL}/categories/questions`, {
        params,
      })
      .subscribe({
        next: (res) => {
          this.questionList.next(res.data);
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

  postQuizData(quizData: any) {
    // todo: create a model for quizData
    this.http.post(`${this.baseURL}/categories/questions`, quizData).subscribe({
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

  createQuestion(categoryId: string, questionData: any) {
    this.http
      .post(`${this.baseURL}/categories/${categoryId}/questions`, questionData)
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

  updateQuestion(questionId: string, questionText: string) {
    this.http
      .put(`${this.baseURL}/categories/questions/${questionId}`, questionText)
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

  deleteQuestion(questionId?: string) {
    this.http
      .delete<APIResponse<void>>(
        `${this.baseURL}/categories/questions/${questionId}`
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.messageService.add({
            severity: 'success',
            summary: res.message,
            detail: '',
          });
          this.successSubject.next('deleteQuestion');
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
