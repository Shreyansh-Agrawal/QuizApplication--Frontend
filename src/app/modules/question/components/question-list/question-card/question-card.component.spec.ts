// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { QuestionCardComponent } from './question-card.component';

// QuestionCardComponent only has @Input/@Output -- smoke test is sufficient.

describe('QuestionCardComponent', () => {
  let component: QuestionCardComponent;
  let fixture: ComponentFixture<QuestionCardComponent>;

  beforeEach(async () => {
    // Configure TestBed with NO_ERRORS_SCHEMA to ignore template elements
    await TestBed.configureTestingModule({
      declarations: [QuestionCardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(QuestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the question-card component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have undefined question input by default', () => {
    // Assert - @Input() question starts as undefined
    expect(component.question).toBeUndefined();
  });
});

// END AI-generated - Cursor Composer
