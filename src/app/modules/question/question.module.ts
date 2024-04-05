import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionCardComponent } from './components/question-list/question-card/question-card.component';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionFormComponent } from './components/question-list/question-form/question-form.component';

@NgModule({
  declarations: [
    QuestionListComponent,
    QuestionCardComponent,
    QuestionFormComponent,
  ],
  imports: [CommonModule, SharedModule, QuestionRoutingModule],
})
export class QuestionModule {}
