// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { QuizQuestionComponent } from './quiz-question.component';
import { QuizService } from '../../services/quiz.service';
import { QuizQuestion } from '../../models/quiz-question.model';
import { QuizResult } from '../../models/quiz-result.model';

// QuizQuestionComponent has submitQuiz() which transforms form data
// into an array of { question_id, user_answer } objects.

describe('QuizQuestionComponent', () => {
  let component: QuizQuestionComponent;
  let fixture: ComponentFixture<QuizQuestionComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let quizQuestionsSubject: Subject<QuizQuestion[]>;
  let quizResultSubject: Subject<QuizResult>;
  let successSubject: Subject<string>;

  beforeEach(async () => {
    // Create Subjects for reactive service properties
    quizQuestionsSubject = new Subject<QuizQuestion[]>();
    quizResultSubject = new Subject<QuizResult>();
    successSubject = new Subject<string>();

    // Create spy for QuizService
    mockQuizService = jasmine.createSpyObj('QuizService', [
      'getQuizQuestions',
      'submitQuizResponses'
    ]);
    (mockQuizService as any).quizQuestions = quizQuestionsSubject;
    (mockQuizService as any).quizResult = quizResultSubject;
    (mockQuizService as any).successSubject = successSubject;

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [QuizQuestionComponent],
      imports: [FormsModule],
      providers: [
        { provide: QuizService, useValue: mockQuizService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(QuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the quiz-question component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call quizService.getQuizQuestions on init', () => {
    // Assert
    expect(mockQuizService.getQuizQuestions).toHaveBeenCalled();
  });

  it('should populate quizQuestions when quizQuestions subject emits', () => {
    // Arrange
    const questions: QuizQuestion[] = [
      { question_id: 'q1', question_text: 'Test?', question_type: 'mcq', options: ['A', 'B'] }
    ];

    // Act
    quizQuestionsSubject.next(questions);

    // Assert
    expect(component.quizQuestions.length).toBe(1);
    expect(component.quizQuestions[0].question_id).toBe('q1');
  });

  it('should transform form data into quiz responses and submit', () => {
    // Arrange - mock the form value with question_id -> answer mapping
    component.form = {
      value: {
        'q1': 'Answer A',
        'q2': 'Answer B'
      }
    } as any;

    // Act
    component.submitQuiz();

    // Assert - submitQuizResponses should be called with transformed array
    expect(mockQuizService.submitQuizResponses).toHaveBeenCalledWith([
      { question_id: 'q1', user_answer: 'Answer A' },
      { question_id: 'q2', user_answer: 'Answer B' }
    ]);
  });

  it('should set showResponses to true when quizResult emits after submit', () => {
    // Arrange
    component.form = { value: { 'q1': 'A' } } as any;
    const result: QuizResult = {
      score: 90,
      responses: [
        { question_id: 'q1', question_text: 'Test?', user_answer: 'A', correct_answer: 'A', is_correct: true }
      ]
    };

    // Act
    component.submitQuiz();
    quizResultSubject.next(result);

    // Assert
    expect(component.showResponses).toBeTrue();
    expect(component.quizResult?.score).toBe(90);
  });
});

// END AI-generated - Cursor Composer
