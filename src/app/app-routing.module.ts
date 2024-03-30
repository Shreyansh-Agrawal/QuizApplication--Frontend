import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LeaderboardComponent } from './shared/components/leaderboard/leaderboard.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { CategoryListComponent } from './shared/components/category-list/category-list.component';
import { UserListComponent } from './shared/components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'users', component: UserListComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'player',
    loadChildren: () =>
      import('./modules/player/player.module').then((mod) => mod.PlayerModule),
  },
  {
    path: 'super-admin',
    loadChildren: () =>
      import('./modules/super-admin/super-admin.module').then((mod) => mod.SuperAdminModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
