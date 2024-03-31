import { Component, OnInit, inject } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css',
})
export class LeaderboardComponent implements OnInit {
  quizService = inject(QuizService);
  leaderboard = [
    {
      player_id: 'PVJjQ6',
      username: 'charlie123',
      score: 100,
      timestamp: '2024-01-30 09:49:41',
    },
    {
      player_id: 'PLLhVX',
      username: 'charlie1233',
      score: 20,
      timestamp: '2024-02-01 06:14:33',
    },
    {
      player_id: 'PVJjQ6',
      username: 'charlie123',
      score: 100,
      timestamp: '2024-01-30 09:49:41',
    },
    {
      player_id: 'PLLhVX',
      username: 'charlie1233',
      score: 20,
      timestamp: '2024-02-01 06:14:33',
    },
    {
      player_id: 'PVJjQ6',
      username: 'charlie123',
      score: 100,
      timestamp: '2024-01-30 09:49:41',
    },
    {
      player_id: 'PLLhVX',
      username: 'charlie1233',
      score: 20,
      timestamp: '2024-02-01 06:14:33',
    },
  ];
  ngOnInit() {
    console.log('ng on init leaderboard comp');
    
    this.quizService.getLeaderboard()
    this.quizService.leaderboardData.subscribe({
      next: (res) => {
        this.leaderboard = res;
      },
    });
  }
}
