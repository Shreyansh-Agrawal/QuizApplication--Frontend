import { Component, Input } from '@angular/core';
import { QuizQuestion } from '../../../models/quiz-question.model';

@Component({
  selector: 'app-quiz-question-card',
  templateUrl: './quiz-question-card.component.html',
  styleUrl: './quiz-question-card.component.css'
})
export class QuizQuestionCardComponent {
  @Input() question: QuizQuestion | undefined;
  ingredient!: string;
}
