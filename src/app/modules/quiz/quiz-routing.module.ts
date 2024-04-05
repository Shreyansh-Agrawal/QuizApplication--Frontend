import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PlayerScoresComponent } from './components/player-scores/player-scores.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { playerGuard } from '../../core/guards/player.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'leaderboard', component: LeaderboardComponent },
      {
        path: 'scores',
        component: PlayerScoresComponent,
        canActivate: [playerGuard],
      },
      {
        path: 'play',
        component: QuizQuestionComponent,
        canActivate: [playerGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
