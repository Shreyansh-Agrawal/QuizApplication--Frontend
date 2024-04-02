import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from '../../shared/components/category-list/category-list.component';
import { UserListComponent } from '../../shared/components/user-list/user-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionCardComponent } from './question-list/question-card/question-card.component';
import { QuestionListComponent } from './question-list/question-list.component';

// ques: how is this working? I havent declared these components in this module, if I do it should show error but its not
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'categories', component: CategoryListComponent },
      { path: 'questions', component: QuestionListComponent },
      { path: 'players', component: UserListComponent }, // should shared component routes be put in the app route? or here?
    ],
  },
];

@NgModule({
  declarations: [
    CreateCategoryComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    QuestionCardComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class AdminModule {}
