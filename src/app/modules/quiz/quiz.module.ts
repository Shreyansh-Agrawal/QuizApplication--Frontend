import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayerScoresComponent } from './components/player-scores/player-scores.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizQuestionCardComponent } from './components/quiz-question/quiz-question-card/quiz-question-card.component';
import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [
    LeaderboardComponent,
    PlayerScoresComponent,
    QuizQuestionComponent,
    QuizQuestionCardComponent,
  ],
  imports: [CommonModule, SharedModule, QuizRoutingModule],
})
export class QuizModule {}
