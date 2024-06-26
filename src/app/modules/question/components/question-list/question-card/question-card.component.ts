import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../../models/question.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css',
})
export class QuestionCardComponent {
  @Input() question: Question | undefined;
  @Output() updateEvent = new EventEmitter<Question>();
  @Output() deleteEvent = new EventEmitter<Question>();
}
