import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);

  getLeaderboard() {
    this.http.get(`${this.baseURL}/leaderboard`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPlayerScores() {
    this.http.get(`${this.baseURL}/scores/me`).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getQuizQuestions(categoryId?: string, questionType?: string, limit?: number) {
    let params = new HttpParams();
    if (categoryId) params = params.append('category_id', categoryId);
    if (questionType) params = params.append('question_type', questionType);
    if (limit) params = params.append('limit', limit);

    this.http.get(`${this.baseURL}/quiz`, { params }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submitQuizResponses(quizResponses: any) {
    this.http.post(`${this.baseURL}/quiz/answers`, quizResponses).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
