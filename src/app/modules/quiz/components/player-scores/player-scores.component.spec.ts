// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerScoresComponent } from './player-scores.component';
import { QuizService } from '../../services/quiz.service';
import { Score } from '../../models/score.model';

// PlayerScoresComponent subscribes to quizService.scores in ngOnInit.

describe('PlayerScoresComponent', () => {
  let component: PlayerScoresComponent;
  let fixture: ComponentFixture<PlayerScoresComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;
  let scoresSubject: Subject<Score[]>;

  beforeEach(async () => {
    // Create Subject for scores data
    scoresSubject = new Subject<Score[]>();

    // Create spy for QuizService
    mockQuizService = jasmine.createSpyObj('QuizService', ['getPlayerScores']);
    (mockQuizService as any).scores = scoresSubject;

    await TestBed.configureTestingModule({
      declarations: [PlayerScoresComponent],
      providers: [
        { provide: QuizService, useValue: mockQuizService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(PlayerScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the player-scores component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call quizService.getPlayerScores on init', () => {
    // Assert
    expect(mockQuizService.getPlayerScores).toHaveBeenCalled();
  });

  it('should populate scores when scores subject emits', () => {
    // Arrange
    const data: Score[] = [
      { score_id: 's1', score: 85, timestamp: '2026-01-01' }
    ];

    // Act
    scoresSubject.next(data);

    // Assert
    expect(component.scores.length).toBe(1);
    expect(component.scores[0].score).toBe(85);
  });
});

// END AI-generated - Cursor Composer
