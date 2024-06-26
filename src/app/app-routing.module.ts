import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NetworkAwarePreloadService } from './core/services/network-aware-preload.service';
import { CustomStrategy } from './shared/constants/service.constants';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
    data: { preload: CustomStrategy.preload },
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./modules/category/category.module').then(
        (mod) => mod.CategoryModule
      ),
    data: { preload: CustomStrategy.preload },
    canActivate: [authGuard]
  },
  {
    path: 'question',
    loadChildren: () =>
      import('./modules/question/question.module').then(
        (mod) => mod.QuestionModule
      ),
    data: { preload: CustomStrategy.fastInternetSpeed },
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'quiz',
    loadChildren: () =>
      import('./modules/quiz/quiz.module').then((mod) => mod.QuizModule),
    data: { preload: CustomStrategy.preload },
    canActivate: [authGuard]
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((mod) => mod.UserModule),
    data: { preload: CustomStrategy.preload },
    canActivate: [authGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NetworkAwarePreloadService,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
