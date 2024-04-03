import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Leaderboard } from '../models/leaderboard.model';
import { APIResponse } from '../../../shared/models/api-response.model';
import { Score } from '../models/score.model';
import { MessageService } from 'primeng/api';
import { QuizQuestion } from '../models/quiz-question.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);
  messageService = inject(MessageService)

  leaderboardData = new Subject<Leaderboard[]>()
  scores = new Subject<Score[]>()
  quizQuestions = new Subject<QuizQuestion[]>()
  isLoading = false;

  getLeaderboard() {
    this.isLoading = true;
    this.http.get<APIResponse<Leaderboard[]>>(`${this.baseURL}/leaderboard`).subscribe({
      next: (res) => {
        this.leaderboardData.next(res.data)
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getPlayerScores() {
    this.isLoading = true;
    this.http.get<APIResponse<Score[]>>(`${this.baseURL}/scores/me`).subscribe({
      next: (res) => {
        this.scores.next(res.data)
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getQuizQuestions(categoryId?: string, questionType?: string, limit?: number) {
    let params = new HttpParams();
    if (categoryId) params = params.append('category_id', categoryId);
    if (questionType) params = params.append('question_type', questionType);
    if (limit) params = params.append('limit', limit);
    this.isLoading = true;
    this.http.get<APIResponse<QuizQuestion[]>>(`${this.baseURL}/quiz`, { params }).subscribe({
      next: (res) => {
        this.quizQuestions.next(res.data);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  submitQuizResponses(quizResponses: any) {
    this.isLoading = true;
    this.http.post(`${this.baseURL}/quiz/answers`, quizResponses).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: err.error.message, detail: '' });
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
