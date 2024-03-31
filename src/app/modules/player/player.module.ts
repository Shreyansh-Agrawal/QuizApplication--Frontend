import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerScoresComponent } from './player-scores/player-scores.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizQuestionCardComponent } from './quiz-question/quiz-question-card/quiz-question-card.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'scores', component: PlayerScoresComponent },
      { path: 'quiz', component: QuizQuestionComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PlayerScoresComponent,
    QuizQuestionComponent,
    QuizQuestionCardComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class PlayerModule {}
