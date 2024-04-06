import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizData } from '../../../models/quiz-data.model';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrl: './question-form.component.css',
})
export class QuestionFormComponent {
  @Input() showQuestionForm = false;
  @Input() category: QuizData | undefined;
  @Output() closeQuestionForm = new EventEmitter<void>();
  @ViewChild('questionForm') form: NgForm | undefined;
  types = ['mcq', 'true-false', 'one-word'];
  questionService = inject(QuestionService);

  selectedType: string | undefined;

  closeForm() {
    this.closeQuestionForm.emit();
  }

  submitForm() {
    let formData = this.form?.value;
    if (formData.questionType === 'mcq') {
      formData = {
        question_text: formData.questionText,
        question_type: formData.questionType,
        answer: formData.answer,
        other_options: [
          formData.option1,
          formData.option2,
          formData.option3,
        ].filter((option) => option.trim() !== ''),
      };
    }
    console.log(formData);
    this.questionService.createQuestion(this.category?.category_id, formData)
  }
}
