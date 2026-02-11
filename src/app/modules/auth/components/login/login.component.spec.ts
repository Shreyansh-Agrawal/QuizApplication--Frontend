// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

// LoginComponent calls authService.login() and toggles loading state.

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let loginSuccessSubject: Subject<void>;
  let errorSubject: Subject<void>;

  beforeEach(async () => {
    // Create Subjects to simulate auth events
    loginSuccessSubject = new Subject<void>();
    errorSubject = new Subject<void>();

    // Create spy objects for injected services
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    (mockAuthService as any).loginSuccess = loginSuccessSubject;
    (mockAuthService as any).errorSubject = errorSubject;

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should set loading to true when login is called', () => {
    // Arrange - loading starts as false
    expect(component.loading).toBeFalse();

    // Act - call login (form is undefined, which is fine -- we test the loading flag)
    component.login();

    // Assert
    expect(component.loading).toBeTrue();
  });

  it('should call authService.login when login is called', () => {
    // Act
    component.login();

    // Assert - authService.login should be called with the form value (undefined here)
    expect(mockAuthService.login).toHaveBeenCalled();
  });

  it('should set loading to false when loginSuccess emits', () => {
    // Arrange
    component.login();
    expect(component.loading).toBeTrue();

    // Act - simulate successful login
    loginSuccessSubject.next();

    // Assert
    expect(component.loading).toBeFalse();
  });

  it('should navigate to quiz/leaderboard on loginSuccess', () => {
    // Arrange
    component.login();

    // Act - simulate successful login
    loginSuccessSubject.next();

    // Assert
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('quiz/leaderboard');
  });

  it('should set loading to false when errorSubject emits', () => {
    // Arrange
    component.login();
    expect(component.loading).toBeTrue();

    // Act - simulate login error
    errorSubject.next();

    // Assert
    expect(component.loading).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
