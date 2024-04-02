import { Component, OnInit, inject } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';
import { Score } from '../../../shared/models/score';

@Component({
  selector: 'app-player-scores',
  templateUrl: './player-scores.component.html',
  styleUrl: './player-scores.component.css'
})
export class PlayerScoresComponent implements OnInit{
  quizService = inject(QuizService);
  scores: Score[] = [];

  ngOnInit() {
    this.quizService.getPlayerScores()
    this.quizService.scores.subscribe({
      next: (res) => {
        this.scores = res;
      },
    });
  }
}
