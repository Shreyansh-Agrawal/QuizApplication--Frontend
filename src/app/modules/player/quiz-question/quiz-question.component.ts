import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';
import { QuizQuestion } from '../../../shared/models/quiz-question';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.css',
})
export class QuizQuestionComponent implements OnInit {
  quizService = inject(QuizService);
  quizQuestions: QuizQuestion[] = [];
  @ViewChild('quizForm') form: NgForm | undefined;

  ngOnInit() {
    this.quizService.getQuizQuestions();
    this.quizService.quizQuestions.subscribe({
      next: (res) => {
        this.quizQuestions = res;
        console.log(res);
        
      },
    });
  }

  submitQuiz() {
    const quizFormData = this.form?.value;
    console.log(quizFormData);
  }
}
