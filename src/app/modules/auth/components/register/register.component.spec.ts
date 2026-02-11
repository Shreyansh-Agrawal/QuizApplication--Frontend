// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';

// RegisterComponent calls authService.register() and toggles loading state.

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let successSubject: Subject<string>;
  let errorSubject: Subject<void>;

  beforeEach(async () => {
    // Create Subjects to simulate auth events
    successSubject = new Subject<string>();
    errorSubject = new Subject<void>();

    // Create spy objects for injected services
    mockAuthService = jasmine.createSpyObj('AuthService', ['register']);
    (mockAuthService as any).successSubject = successSubject;
    (mockAuthService as any).errorSubject = errorSubject;

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should set loading to true when register is called', () => {
    // Arrange
    expect(component.loading).toBeFalse();

    // Act
    component.register();

    // Assert
    expect(component.loading).toBeTrue();
  });

  it('should call authService.register when register is called', () => {
    // Act
    component.register();

    // Assert
    expect(mockAuthService.register).toHaveBeenCalled();
  });

  it('should set loading to false and navigate on successful registration', () => {
    // Arrange
    component.register();
    expect(component.loading).toBeTrue();

    // Act - simulate successful registration
    successSubject.next('register');

    // Assert
    expect(component.loading).toBeFalse();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('auth/login');
  });

  it('should not change loading for non-register success events', () => {
    // Arrange
    component.register();
    expect(component.loading).toBeTrue();

    // Act - simulate a different success event (not 'register')
    successSubject.next('someOtherEvent');

    // Assert - loading should still be true
    expect(component.loading).toBeTrue();
  });

  it('should set loading to false when errorSubject emits', () => {
    // Arrange
    component.register();
    expect(component.loading).toBeTrue();

    // Act - simulate error
    errorSubject.next();

    // Assert
    expect(component.loading).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
