import { Component, OnInit, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Leaderboard } from '../../models/leaderboard.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  quizService = inject(QuizService);
  leaderboard: Leaderboard[] = [];

  ngOnInit() {
    this.quizService.getLeaderboard()
    this.quizService.leaderboardData.subscribe({
      next: (res) => {
        this.leaderboard = res;
      },
    });
  }
}
