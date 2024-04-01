import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';
import { CategoryCardComponent } from './shared/components/category-list/category-card/category-card.component';
import { CategoryListComponent } from './shared/components/category-list/category-list.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LeaderboardComponent } from './shared/components/leaderboard/leaderboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserListComponent } from './shared/components/user-list/user-list.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { SharedModule } from './shared/shared.module';
// import { LoaderComponent } from './utils/loader/loader.component';
import { SnackbarComponent } from './utils/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    SnackbarComponent,
    LeaderboardComponent,
    CategoryListComponent,
    UserProfileComponent,
    CategoryCardComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    MessageService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
