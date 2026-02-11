// BEGIN AI-generated - Cursor Composer

import { SliceWordsPipe } from './slice-words.pipe';

// We test SliceWordsPipe because it has branching logic for truncating strings.
// It is a pure transform -- no Angular TestBed needed.

describe('SliceWordsPipe', () => {
  let pipe: SliceWordsPipe;

  beforeEach(() => {
    // Create a fresh pipe instance before each test
    pipe = new SliceWordsPipe();
  });

  it('should return empty string when value is null', () => {
    // Arrange - pass null as the input value
    const value = null as unknown as string;

    // Act
    const result = pipe.transform(value);

    // Assert
    expect(result).toBe('');
  });

  it('should return empty string when value is undefined', () => {
    // Arrange - pass undefined (no argument)

    // Act
    const result = pipe.transform(undefined);

    // Assert
    expect(result).toBe('');
  });

  it('should return original string when it is shorter than the end limit', () => {
    // Arrange - a short string with an end limit greater than its length
    const value = 'Hello';
    const end = 10;

    // Act
    const result = pipe.transform(value, 0, end);

    // Assert - string is shorter than end, so it is returned unchanged
    expect(result).toBe('Hello');
  });

  it('should truncate and append ellipsis when string exceeds end limit', () => {
    // Arrange - a long string with an end limit that cuts it short
    const value = 'Hello World from Angular';
    const end = 5;

    // Act
    const result = pipe.transform(value, 0, end);

    // Assert - first 5 characters + '...'
    expect(result).toBe('Hello...');
  });

  it('should slice from the start index when provided', () => {
    // Arrange - start slicing from index 6
    const value = 'Hello World from Angular';
    const start = 6;
    const end = 11;

    // Act
    const result = pipe.transform(value, start, end);

    // Assert - characters from index 6 to 11 + '...'
    expect(result).toBe('World...');
  });

  it('should append ellipsis when no end is provided and string exists', () => {
    // Arrange - no end parameter means the pipe slices the full string and appends '...'
    const value = 'Test';

    // Act
    const result = pipe.transform(value);

    // Assert - when end is undefined, the if(end && ...) check is falsy,
    // so it falls through to slice(start, end) + '...'
    expect(result).toBe('Test...');
  });
});

// END AI-generated - Cursor Composer
