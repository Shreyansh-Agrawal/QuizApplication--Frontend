// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionFormComponent } from './question-form.component';
import { QuestionService } from '../../../services/question.service';

// QuestionFormComponent has submitForm() which transforms MCQ data differently.

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;
  let mockQuestionService: jasmine.SpyObj<QuestionService>;

  beforeEach(async () => {
    // Create spy for QuestionService
    mockQuestionService = jasmine.createSpyObj('QuestionService', ['createQuestion']);

    await TestBed.configureTestingModule({
      declarations: [QuestionFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: QuestionService, useValue: mockQuestionService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the question-form component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have three question types available', () => {
    // Assert - the types array should contain mcq, true-false, one-word
    expect(component.types).toEqual(['mcq', 'true-false', 'one-word']);
  });

  it('should emit closeQuestionForm when closeForm is called', () => {
    // Arrange
    spyOn(component.closeQuestionForm, 'emit');

    // Act
    component.closeForm();

    // Assert
    expect(component.closeQuestionForm.emit).toHaveBeenCalled();
  });

  it('should transform MCQ form data with answer and other_options on submitForm', () => {
    // Arrange - simulate the form having MCQ data
    // We set the form's value directly via the ViewChild mock
    component.form = {
      value: {
        questionType: 'mcq',
        questionText: 'What is Angular?',
        answer: 'A framework',
        option1: 'A library',
        option2: 'A language',
        option3: 'A tool'
      }
    } as any;
    component.category = { category_id: 'cat-1', category: 'Tech', question_data: [] };

    // Act
    component.submitForm();

    // Assert - createQuestion should be called with transformed MCQ data
    expect(mockQuestionService.createQuestion).toHaveBeenCalledWith('cat-1', {
      question_text: 'What is Angular?',
      question_type: 'mcq',
      answer: 'A framework',
      other_options: ['A library', 'A language', 'A tool']
    });
  });

  it('should filter out empty MCQ options on submitForm', () => {
    // Arrange - one option is empty
    component.form = {
      value: {
        questionType: 'mcq',
        questionText: 'Test?',
        answer: 'Yes',
        option1: 'No',
        option2: '  ',
        option3: 'Maybe'
      }
    } as any;
    component.category = { category_id: 'cat-1', category: 'Test', question_data: [] };

    // Act
    component.submitForm();

    // Assert - empty option should be filtered out
    expect(mockQuestionService.createQuestion).toHaveBeenCalledWith('cat-1', {
      question_text: 'Test?',
      question_type: 'mcq',
      answer: 'Yes',
      other_options: ['No', 'Maybe']
    });
  });

  it('should pass non-MCQ form data as-is on submitForm', () => {
    // Arrange - simulate a non-MCQ question type
    component.form = {
      value: {
        questionType: 'true-false',
        questionText: 'Is Angular a framework?',
        answer: 'true'
      }
    } as any;
    component.category = { category_id: 'cat-2', category: 'Tech', question_data: [] };

    // Act
    component.submitForm();

    // Assert - data should be passed through without transformation
    expect(mockQuestionService.createQuestion).toHaveBeenCalledWith('cat-2', {
      questionType: 'true-false',
      questionText: 'Is Angular a framework?',
      answer: 'true'
    });
  });
});

// END AI-generated - Cursor Composer
