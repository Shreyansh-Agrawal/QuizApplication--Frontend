// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

// UserProfileComponent loads the user profile on init and provides
// update profile / update password actions.

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let profileSubject: Subject<User>;
  let successSubject: Subject<string>;
  let errorSubject: Subject<string>;

  beforeEach(async () => {
    // Create Subjects for reactive service properties
    profileSubject = new Subject<User>();
    successSubject = new Subject<string>();
    errorSubject = new Subject<string>();

    // Create spy for UserService
    mockUserService = jasmine.createSpyObj('UserService', [
      'getUserProfile',
      'updateUserProfile',
      'updateUserPassword'
    ]);
    (mockUserService as any).profile = profileSubject;
    (mockUserService as any).successSubject = successSubject;
    (mockUserService as any).errorSubject = errorSubject;

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user-profile component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should call userService.getUserProfile on init', () => {
    // Assert
    expect(mockUserService.getUserProfile).toHaveBeenCalled();
  });

  it('should populate user data when profile subject emits', () => {
    // Arrange
    const user = new User('testuser', 'Test User', 'test@example.com', 'u1', '2026-01-01');

    // Act
    profileSubject.next(user);

    // Assert
    expect(component.name).toBe('Test User');
    expect(component.email).toBe('test@example.com');
    expect(component.username).toBe('testuser');
    expect(component.registrationDate).toBe('2026-01-01');
  });

  it('should set loadingUpdateProfile to true when updateProfile is called', () => {
    // Arrange
    expect(component.loadingUpdateProfile).toBeFalse();

    // Act
    component.updateProfile();

    // Assert
    expect(component.loadingUpdateProfile).toBeTrue();
    expect(mockUserService.updateUserProfile).toHaveBeenCalled();
  });

  it('should set loadingUpdatePassword to true when updatePassword is called', () => {
    // Arrange
    expect(component.loadingUpdatePassword).toBeFalse();

    // Act
    component.updatePassword();

    // Assert
    expect(component.loadingUpdatePassword).toBeTrue();
    expect(mockUserService.updateUserPassword).toHaveBeenCalled();
  });
});

// END AI-generated - Cursor Composer
