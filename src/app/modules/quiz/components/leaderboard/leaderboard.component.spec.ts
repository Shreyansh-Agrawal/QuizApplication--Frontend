// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { LeaderboardComponent } from './leaderboard.component';
import { QuizService } from '../../services/quiz.service';
import { Leaderboard } from '../../models/leaderboard.model';

// LeaderboardComponent subscribes to quizService.leaderboardData in ngOnInit.

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;
  let leaderboardSubject: Subject<Leaderboard[]>;

  beforeEach(async () => {
    // Create Subject for leaderboard data
    leaderboardSubject = new Subject<Leaderboard[]>();

    // Create spy for QuizService
    mockQuizService = jasmine.createSpyObj('QuizService', ['getLeaderboard']);
    (mockQuizService as any).leaderboardData = leaderboardSubject;

    await TestBed.configureTestingModule({
      declarations: [LeaderboardComponent],
      providers: [
        { provide: QuizService, useValue: mockQuizService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the leaderboard component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call quizService.getLeaderboard on init', () => {
    // Assert - ngOnInit already ran in beforeEach
    expect(mockQuizService.getLeaderboard).toHaveBeenCalled();
  });

  it('should populate leaderboard when leaderboardData emits', () => {
    // Arrange
    const data: Leaderboard[] = [
      { player_id: 'p1', username: 'Player1', score: 100, timestamp: '2026-01-01' }
    ];

    // Act - simulate data emission
    leaderboardSubject.next(data);

    // Assert
    expect(component.leaderboard.length).toBe(1);
    expect(component.leaderboard[0].username).toBe('Player1');
  });
});

// END AI-generated - Cursor Composer
