// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { UserRoleService } from '../../../../core/services/user-role.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Roles } from '../../../../shared/constants/roles.constants';
import { User } from '../../models/user.model';

// UserListComponent has route-based branching in getAllUsers(),
// plus routeIsAdminRoute() and routeIsPlayerRoute() URL checks.

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;
  let mockRouter: { navigateByUrl: jasmine.Spy; url: string };
  let usersSubject: Subject<User[]>;
  let successSubject: Subject<string>;

  beforeEach(async () => {
    // Create Subjects for reactive service properties
    usersSubject = new Subject<User[]>();
    successSubject = new Subject<string>();

    // Create spy objects
    mockUserService = jasmine.createSpyObj('UserService', [
      'getAllPlayers',
      'getAllAdmins',
      'deleteAdmin',
      'deletePlayer'
    ]);
    (mockUserService as any).users = usersSubject;
    (mockUserService as any).successSubject = successSubject;

    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['getUserRole']);
    mockUserRoleService.getUserRole.and.returnValue(Roles.superAdmin);

    // Use a plain object so we can change url property between tests
    mockRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl'), url: '/user/players' };

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: UserRoleService, useValue: mockUserRoleService },
        { provide: Router, useValue: mockRouter },
        { provide: ConfirmationService, useValue: jasmine.createSpyObj('ConfirmationService', ['confirm']) },
        { provide: MessageService, useValue: jasmine.createSpyObj('MessageService', ['add']) }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the user-list component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  // --- routeIsPlayerRoute / routeIsAdminRoute ---

  it('should return true from routeIsPlayerRoute when URL contains player', () => {
    // Arrange - router.url is '/user/players' (set in beforeEach)

    // Act
    const result = component.routeIsPlayerRoute();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from routeIsAdminRoute when URL is player route', () => {
    // Arrange - router.url is '/user/players'

    // Act
    const result = component.routeIsAdminRoute();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true from routeIsAdminRoute when URL contains admin', () => {
    // Arrange - change the mock router URL to an admin route
    mockRouter.url = '/user/admins';

    // Act
    const result = component.routeIsAdminRoute();

    // Assert
    expect(result).toBeTrue();
  });

  // --- getAllUsers branching ---

  it('should call getAllPlayers when on player route', () => {
    // Arrange - router.url is '/user/players'

    // Act
    component.getAllUsers();

    // Assert
    expect(mockUserService.getAllPlayers).toHaveBeenCalled();
  });

  it('should call getAllAdmins when on admin route', () => {
    // Arrange - change the mock router URL to an admin route
    mockRouter.url = '/user/admins';

    // Act
    component.getAllUsers();

    // Assert
    expect(mockUserService.getAllAdmins).toHaveBeenCalled();
  });

  // --- userRoleIsAdmin / userRoleIsSuperAdmin ---

  it('should return true from userRoleIsSuperAdmin when role is super-admin', () => {
    // Arrange - userRole is set from mock getUserRole returning superAdmin
    component.userRole = Roles.superAdmin;

    // Act
    const result = component.userRoleIsSuperAdmin();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsAdmin when role is super-admin', () => {
    // Arrange
    component.userRole = Roles.superAdmin;

    // Act
    const result = component.userRoleIsAdmin();

    // Assert
    expect(result).toBeFalse();
  });

  // --- form open/close ---

  it('should set showUserForm to true when openCreateUserForm is called', () => {
    // Act
    component.openCreateUserForm();

    // Assert
    expect(component.showUserForm).toBeTrue();
  });

  it('should set showUserForm to false when closeUserForm is called', () => {
    // Arrange
    component.showUserForm = true;

    // Act
    component.closeUserForm();

    // Assert
    expect(component.showUserForm).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
