import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { LeaderboardData } from '../../shared/models/leaderboardData';
import { APIResponse } from '../../shared/models/APIResponse';
import { Score } from '../../shared/models/score';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseURL = 'https://api-smartquiz.onrender.com/v1';
  http = inject(HttpClient);

  leaderboardData = new Subject<LeaderboardData[]>()
  scores = new Subject<Score[]>()

  getLeaderboard() {
    this.http.get<APIResponse<LeaderboardData[]>>(`${this.baseURL}/leaderboard`).subscribe({
      next: (res) => {
        console.log(res);
        this.leaderboardData.next(res.data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPlayerScores() {
    this.http.get<APIResponse<Score[]>>(`${this.baseURL}/scores/me`).subscribe({
      next: (res) => {
        console.log(res);
        this.scores.next(res.data)
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
