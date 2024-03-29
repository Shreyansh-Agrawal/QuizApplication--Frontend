import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerScoresComponent } from './player-scores/player-scores.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizQuestionCardComponent } from './quiz-question/quiz-question-card/quiz-question-card.component';



@NgModule({
  declarations: [
    PlayerScoresComponent,
    QuizQuestionComponent,
    QuizQuestionCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayerModule { }
