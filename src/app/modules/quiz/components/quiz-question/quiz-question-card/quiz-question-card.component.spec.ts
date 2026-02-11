// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuizQuestionCardComponent } from './quiz-question-card.component';

// QuizQuestionCardComponent only has @Input -- smoke test plus default check.

describe('QuizQuestionCardComponent', () => {
  let component: QuizQuestionCardComponent;
  let fixture: ComponentFixture<QuizQuestionCardComponent>;

  beforeEach(async () => {
    // Configure TestBed with NO_ERRORS_SCHEMA to ignore template elements
    await TestBed.configureTestingModule({
      declarations: [QuizQuestionCardComponent],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(QuizQuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the quiz-question-card component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have default empty question input', () => {
    // Assert - @Input has default values with empty strings
    expect(component.question.question_id).toBe('');
    expect(component.question.question_text).toBe('');
    expect(component.question.options).toEqual([]);
  });
});

// END AI-generated - Cursor Composer
