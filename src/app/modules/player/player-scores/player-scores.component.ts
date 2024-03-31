import { Component, inject } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';

@Component({
  selector: 'app-player-scores',
  templateUrl: './player-scores.component.html',
  styleUrl: './player-scores.component.css'
})
export class PlayerScoresComponent {
  quizService = inject(QuizService);
  scores = [
    {
        "score_id": "SEDwPR",
        "score": 100,
        "timestamp": "2024-02-02 15:25:51"
    },
    {
        "score_id": "SH5Z9r",
        "score": 100,
        "timestamp": "2024-02-02 15:23:55"
    },
    {
        "score_id": "STiZS3",
        "score": 20,
        "timestamp": "2024-01-30 10:00:48"
    },
    {
        "score_id": "SPJDzn",
        "score": 20,
        "timestamp": "2024-01-30 09:54:52"
    },
    {
        "score_id": "STBpAt",
        "score": 0,
        "timestamp": "2024-01-30 09:54:08"
    },
    {
        "score_id": "SJkiQU",
        "score": 0,
        "timestamp": "2024-01-30 09:53:45"
    },
    {
        "score_id": "S9Z9Ln",
        "score": 0,
        "timestamp": "2024-01-30 09:53:02"
    },
    {
        "score_id": "SHLcmP",
        "score": 0,
        "timestamp": "2024-01-30 09:52:32"
    },
    {
        "score_id": "STzw97",
        "score": 0,
        "timestamp": "2024-01-30 09:51:33"
    },
    {
        "score_id": "SYqTxw",
        "score": 0,
        "timestamp": "2024-01-30 09:51:19"
    },
    {
        "score_id": "SCiWNA",
        "score": 0,
        "timestamp": "2024-01-30 09:50:24"
    },
    {
        "score_id": "STFU9U",
        "score": 0,
        "timestamp": "2024-01-30 09:49:41"
    }
]
  ngOnInit() {
    console.log('ng on init scores comp');
    
    this.quizService.getPlayerScores()
    this.quizService.scores.subscribe({
      next: (res) => {
        this.scores = res;
      },
    });
  }
}
