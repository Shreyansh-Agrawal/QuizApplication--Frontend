// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { QuestionListComponent } from './question-list.component';
import { QuestionService } from '../../services/question.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { QuizData } from '../../models/quiz-data.model';

// QuestionListComponent has filterCategory() and filterQuestion() methods
// with string-matching logic worth testing.

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let mockQuestionService: jasmine.SpyObj<QuestionService>;
  let questionListSubject: Subject<QuizData[]>;
  let successSubject: Subject<string>;

  // Sample quiz data used across filter tests
  const sampleQuizData: QuizData[] = [
    {
      category: 'Science',
      question_data: [
        {
          question_text: 'What is gravity?',
          question_type: 'mcq',
          options: { answer: 'Force', other_options: ['Energy', 'Mass'] }
        },
        {
          question_text: 'What is photosynthesis?',
          question_type: 'mcq',
          options: { answer: 'Process', other_options: ['Plant', 'Animal'] }
        }
      ]
    },
    {
      category: 'Math',
      question_data: [
        {
          question_text: 'What is 2+2?',
          question_type: 'mcq',
          options: { answer: '4', other_options: ['3', '5'] }
        }
      ]
    }
  ];

  beforeEach(async () => {
    // Create Subjects for reactive service properties
    questionListSubject = new Subject<QuizData[]>();
    successSubject = new Subject<string>();

    // Create spy for QuestionService
    mockQuestionService = jasmine.createSpyObj('QuestionService', [
      'getQuizData',
      'getQuizDataForDownload',
      'deleteQuestion',
      'postQuizData'
    ]);
    (mockQuestionService as any).questionList = questionListSubject;
    (mockQuestionService as any).successSubject = successSubject;

    await TestBed.configureTestingModule({
      declarations: [QuestionListComponent],
      providers: [
        { provide: QuestionService, useValue: mockQuestionService },
        { provide: ConfirmationService, useValue: jasmine.createSpyObj('ConfirmationService', ['confirm']) },
        { provide: MessageService, useValue: jasmine.createSpyObj('MessageService', ['add']) }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the question-list component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call questionService.getQuizData on init', () => {
    // Assert - ngOnInit already ran in beforeEach
    expect(mockQuestionService.getQuizData).toHaveBeenCalled();
  });

  // --- filterCategory ---

  it('should filter categories matching the query prefix', () => {
    // Arrange - populate quizData and create an autocomplete event
    component.quizData = sampleQuizData;
    const event = { originalEvent: new Event('input'), query: 'Sci' };

    // Act
    component.filterCategory(event);

    // Assert - only 'Science' should match 'Sci'
    expect(component.filteredCategories.length).toBe(1);
    expect(component.filteredCategories[0].category).toBe('Science');
  });

  it('should return empty array when no categories match the query', () => {
    // Arrange
    component.quizData = sampleQuizData;
    const event = { originalEvent: new Event('input'), query: 'History' };

    // Act
    component.filterCategory(event);

    // Assert
    expect(component.filteredCategories.length).toBe(0);
  });

  it('should filter categories case-insensitively', () => {
    // Arrange
    component.quizData = sampleQuizData;
    const event = { originalEvent: new Event('input'), query: 'math' };

    // Act
    component.filterCategory(event);

    // Assert - 'Math' should match 'math'
    expect(component.filteredCategories.length).toBe(1);
    expect(component.filteredCategories[0].category).toBe('Math');
  });

  // --- filterQuestion ---

  it('should filter questions matching the query prefix', () => {
    // Arrange
    component.quizData = sampleQuizData;
    const event = { originalEvent: new Event('input'), query: 'What is g' };

    // Act
    component.filterQuestion(event);

    // Assert - only 'What is gravity?' should match
    expect(component.filteredQuestions.length).toBe(1);
    expect(component.filteredQuestions[0].question_text).toBe('What is gravity?');
  });

  it('should filter questions across all categories', () => {
    // Arrange
    component.quizData = sampleQuizData;
    const event = { originalEvent: new Event('input'), query: 'What' };

    // Act
    component.filterQuestion(event);

    // Assert - all 3 questions start with 'What'
    expect(component.filteredQuestions.length).toBe(3);
  });

  // --- form open/close ---

  it('should open question form and set category', () => {
    // Arrange
    const category = sampleQuizData[0];

    // Act
    component.openCreateQuestionForm(category);

    // Assert
    expect(component.showQuestionForm).toBeTrue();
    expect(component.category).toBe(category);
  });

  it('should close question form', () => {
    // Arrange
    component.showQuestionForm = true;

    // Act
    component.closeQuestionForm();

    // Assert
    expect(component.showQuestionForm).toBeFalse();
  });

  // --- downloadQuizData ---

  it('should call questionService.getQuizDataForDownload on download', () => {
    // Act
    component.downloadQuizData();

    // Assert
    expect(mockQuestionService.getQuizDataForDownload).toHaveBeenCalled();
  });
});

// END AI-generated - Cursor Composer
