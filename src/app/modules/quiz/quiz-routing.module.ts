import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayerScoresComponent } from './components/player-scores/player-scores.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'leaderboard', component: LeaderboardComponent },
      { path: 'scores', component: PlayerScoresComponent },
      { path: 'play', component: QuizQuestionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
