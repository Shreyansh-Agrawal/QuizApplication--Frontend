import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { QuizQuestion } from '../../models/quiz-question.model';
import { QuizResponse } from '../../models/quiz-response.model';
import { Router } from '@angular/router';
import { QuizResult } from '../../models/quiz-result.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.css',
})
export class QuizQuestionComponent implements OnInit {
  loading = false;
  showResponses = false;
  quizResult: QuizResult | undefined;
  quizService = inject(QuizService);
  router = inject(Router);
  quizQuestions: QuizQuestion[] = [];
  playerResponses: QuizResponse[] = [];
  userResponse: { [questionId: string]: string } = {};
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
    // this.loading = true;
    const quizFormData = this.form?.value;
    console.log(quizFormData);

    const answers = Object.keys(quizFormData).map((question_id) => ({
      question_id,
      user_answer: quizFormData[question_id],
    }));

    console.log(answers);
    this.quizService.submitQuizResponses(answers);
    // this.quizService.successSubject.subscribe()

    // todo: display a card showing responses with the score obtained
    // on clicking ok in the card it should redirect to scores url
    // this.router.navigateByUrl('quiz/scores');
    this.quizService.quizResult.subscribe({
      next: (result) => {
        console.log(result);
        
        this.quizResult = result;
        this.showResponses = true;
      }
    });
  }
}
