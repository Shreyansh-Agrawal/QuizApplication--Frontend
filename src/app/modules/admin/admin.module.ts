import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionCardComponent } from './question-list/question-card/question-card.component';



@NgModule({
  declarations: [
    CreateCategoryComponent,
    CreateQuestionComponent,
    QuestionListComponent,
    QuestionCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
