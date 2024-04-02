import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionCardComponent } from './components/question-list/question-card/question-card.component';
import { CreateQuestionComponent } from './components/question-list/create-question/create-question.component';
import { QuestionRoutingModule } from './question-routing.module';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCardComponent,
    CreateQuestionComponent,
  ],
  imports: [CommonModule, SharedModule, QuestionRoutingModule],
})
export class QuestionModule {}
