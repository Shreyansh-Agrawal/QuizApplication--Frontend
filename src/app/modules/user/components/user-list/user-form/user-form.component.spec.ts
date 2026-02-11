// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../../../services/user.service';

// UserFormComponent calls userService.createAdmin() and emits closeForm on success.

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let successSubject: Subject<string>;

  beforeEach(async () => {
    // Create Subject for success events
    successSubject = new Subject<string>();

    // Create spy for UserService
    mockUserService = jasmine.createSpyObj('UserService', ['createAdmin']);
    (mockUserService as any).successSubject = successSubject;

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user-form component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should emit closeForm with false when closeUserForm is called', () => {
    // Arrange
    spyOn(component.closeForm, 'emit');

    // Act
    component.closeUserForm();

    // Assert
    expect(component.closeForm.emit).toHaveBeenCalledWith(false);
  });

  it('should call userService.createAdmin when createUser is called', () => {
    // Arrange - form is undefined, so userData will be undefined
    // This is fine -- we just verify the service is called

    // Act
    component.createUser();

    // Assert
    expect(mockUserService.createAdmin).toHaveBeenCalled();
  });

  it('should close the form when successSubject emits after createUser', () => {
    // Arrange
    spyOn(component.closeForm, 'emit');

    // Act
    component.createUser();
    successSubject.next('createAdmin');

    // Assert - closeUserForm should have been called, which emits closeForm
    expect(component.closeForm.emit).toHaveBeenCalledWith(false);
  });
});

// END AI-generated - Cursor Composer
