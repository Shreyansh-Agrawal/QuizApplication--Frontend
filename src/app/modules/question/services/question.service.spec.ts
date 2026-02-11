// BEGIN AI-generated - Cursor Composer

import { QuestionService } from './question.service';

// We test only the pure utility methods in QuestionService:
// - removeUnnecessaryCategoryProperties
// - removeUnnecessaryQuestionProperties
// - transformQuestionTypeToLowercase
// - filterQuestionsWithNullValues
//
// HTTP methods (getQuizData, createQuestion, etc.) are skipped because they
// are boilerplate subscribe-to-subject patterns that would just test HttpClient mocking.

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(() => {
    // We instantiate the service directly. The HTTP and MessageService
    // dependencies are injected via inject(), but we never call methods
    // that use them, so they remain unused in these tests.
    service = Object.create(QuestionService.prototype);
  });

  // --- removeUnnecessaryCategoryProperties ---

  it('should remove created_by and category_id from category', () => {
    // Arrange - a category object with the properties to be removed
    const category = {
      category: 'Science',
      created_by: 'admin1',
      category_id: 'cat-123',
      question_data: []
    };

    // Act
    service.removeUnnecessaryCategoryProperties(category);

    // Assert - both properties should be deleted
    expect('created_by' in category).toBeFalse();
    expect('category_id' in category).toBeFalse();
    // Other properties should remain untouched
    expect(category.category).toBe('Science');
  });

  it('should not fail when category has no created_by or category_id', () => {
    // Arrange - a category without the optional properties
    const category = {
      category: 'Math',
      question_data: []
    };

    // Act - should not throw an error
    service.removeUnnecessaryCategoryProperties(category);

    // Assert - object should remain unchanged
    expect(category.category).toBe('Math');
    expect(Object.keys(category)).toEqual(['category', 'question_data']);
  });

  // --- removeUnnecessaryQuestionProperties ---

  it('should remove created_by and question_id from question', () => {
    // Arrange - a question object with the properties to be removed
    const question = {
      question_text: 'What is 2+2?',
      question_type: 'MCQ',
      created_by: 'admin1',
      question_id: 'q-456',
      options: { answer: '4', other_options: ['3', '5', '6'] }
    };

    // Act
    service.removeUnnecessaryQuestionProperties(question);

    // Assert
    expect('created_by' in question).toBeFalse();
    expect('question_id' in question).toBeFalse();
    expect(question.question_text).toBe('What is 2+2?');
  });

  it('should not fail when question has no created_by or question_id', () => {
    // Arrange - a question without the optional properties
    const question = {
      question_text: 'What is 3+3?',
      question_type: 'MCQ',
      options: { answer: '6', other_options: ['4', '5', '7'] }
    };

    // Act - should not throw an error
    service.removeUnnecessaryQuestionProperties(question);

    // Assert - object should remain unchanged
    expect(question.question_text).toBe('What is 3+3?');
  });

  // --- transformQuestionTypeToLowercase ---

  it('should lowercase the question_type field', () => {
    // Arrange - question_type is uppercase
    const question = { question_type: 'MCQ', question_text: 'Test?' };

    // Act
    service.transformQuestionTypeToLowercase(question);

    // Assert
    expect(question.question_type).toBe('mcq');
  });

  it('should keep already-lowercase question_type unchanged', () => {
    // Arrange - question_type is already lowercase
    const question = { question_type: 'true/false', question_text: 'Test?' };

    // Act
    service.transformQuestionTypeToLowercase(question);

    // Assert
    expect(question.question_type).toBe('true/false');
  });

  // --- filterQuestionsWithNullValues ---

  it('should keep questions where all values are non-null', () => {
    // Arrange - all fields and option values are populated
    const questions = [
      {
        question_text: 'Q1',
        question_type: 'mcq',
        options: { answer: 'A', other_options: ['B', 'C'] }
      }
    ];

    // Act
    const result = service.filterQuestionsWithNullValues(questions);

    // Assert - the question passes the filter
    expect(result.length).toBe(1);
    expect(result[0].question_text).toBe('Q1');
  });

  it('should filter out questions with null field values', () => {
    // Arrange - one question has a null question_text
    const questions = [
      {
        question_text: null,
        question_type: 'mcq',
        options: { answer: 'A', other_options: ['B'] }
      },
      {
        question_text: 'Valid Q',
        question_type: 'mcq',
        options: { answer: 'X', other_options: ['Y'] }
      }
    ];

    // Act
    const result = service.filterQuestionsWithNullValues(questions);

    // Assert - only the valid question should remain
    expect(result.length).toBe(1);
    expect(result[0].question_text).toBe('Valid Q');
  });

  it('should filter out questions with null option values', () => {
    // Arrange - question has valid fields but a null value inside options
    const questions = [
      {
        question_text: 'Q1',
        question_type: 'mcq',
        options: { answer: null, other_options: ['B'] }
      }
    ];

    // Act
    const result = service.filterQuestionsWithNullValues(questions);

    // Assert - should be filtered out because options.answer is null
    expect(result.length).toBe(0);
  });
});

// END AI-generated - Cursor Composer
