import { Component, OnInit, inject } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';
import { LeaderboardData } from '../../models/leaderboard-data';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  quizService = inject(QuizService);
  leaderboard: LeaderboardData[] = [];

  ngOnInit() {
    this.quizService.getLeaderboard()
    this.quizService.leaderboardData.subscribe({
      next: (res) => {
        this.leaderboard = res;
      },
    });
  }
}
