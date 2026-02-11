// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { UserRoleService } from '../../../core/services/user-role.service';
import { Roles } from '../../constants/roles.constants';

// NavbarComponent has role-based menu visibility logic, logout flow,
// and URL matching. We test all of these behaviors.

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLocation: jasmine.SpyObj<Location>;
  let loginSuccessSubject: Subject<void>;

  beforeEach(async () => {
    // Create a Subject to simulate loginSuccess emissions
    loginSuccessSubject = new Subject<void>();

    // Create spy objects for all injected services
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', [
      'getLoginStatus',
      'getUserRole'
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
    // Attach the loginSuccess subject to the mock
    (mockAuthService as any).loginSuccess = loginSuccessSubject;

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl'], { url: '/quiz/leaderboard' });
    mockLocation = jasmine.createSpyObj('Location', ['back', 'forward']);

    // Default: user is logged out
    mockUserRoleService.getLoginStatus.and.returnValue(false);
    mockUserRoleService.getUserRole.and.returnValue('');

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  // --- updateMenuItems: role-based visibility ---

  it('should hide all role-specific items when user is not logged in', () => {
    // Arrange - user is not logged in (default from beforeEach)

    // Act
    component.updateMenuItems();

    // Assert - all menu items should have visible=false
    const visibleItems = component.items?.filter(item => item.visible);
    expect(visibleItems?.length).toBe(0);
  });

  it('should show Categories, Leaderboard, and Profile for any logged-in user', () => {
    // Arrange - user is logged in with player role
    component.isLoggedIn = true;
    component.role = Roles.player;

    // Act
    component.updateMenuItems();

    // Assert - Categories, Leaderboard, and Profile should be visible
    const visibleLabels = component.items
      ?.filter(item => item.visible)
      .map(item => item.label);
    expect(visibleLabels).toContain('Categories');
    expect(visibleLabels).toContain('Leaderboard');
    expect(visibleLabels).toContain('Profile');
  });

  it('should show Take Quiz and My Scores only for player role', () => {
    // Arrange - logged-in player
    component.isLoggedIn = true;
    component.role = Roles.player;

    // Act
    component.updateMenuItems();

    // Assert
    const visibleLabels = component.items
      ?.filter(item => item.visible)
      .map(item => item.label);
    expect(visibleLabels).toContain('Take Quiz');
    expect(visibleLabels).toContain('My Scores');
  });

  it('should show Questions only for admin role', () => {
    // Arrange - logged-in admin
    component.isLoggedIn = true;
    component.role = Roles.admin;

    // Act
    component.updateMenuItems();

    // Assert
    const visibleLabels = component.items
      ?.filter(item => item.visible)
      .map(item => item.label);
    expect(visibleLabels).toContain('Questions');
    // Take Quiz and My Scores should NOT be visible for admin
    expect(visibleLabels).not.toContain('Take Quiz');
    expect(visibleLabels).not.toContain('My Scores');
  });

  it('should show Admins only for super-admin role', () => {
    // Arrange - logged-in super-admin
    component.isLoggedIn = true;
    component.role = Roles.superAdmin;

    // Act
    component.updateMenuItems();

    // Assert
    const visibleLabels = component.items
      ?.filter(item => item.visible)
      .map(item => item.label);
    expect(visibleLabels).toContain('Admins');
    expect(visibleLabels).toContain('Players');
  });

  it('should show Players for both admin and super-admin roles', () => {
    // Arrange - logged-in admin
    component.isLoggedIn = true;
    component.role = Roles.admin;

    // Act
    component.updateMenuItems();

    // Assert
    const visibleLabels = component.items
      ?.filter(item => item.visible)
      .map(item => item.label);
    expect(visibleLabels).toContain('Players');
  });

  // --- logout ---

  it('should set isLoggedIn to false and call authService.logout on logout', () => {
    // Arrange - user is logged in
    component.isLoggedIn = true;

    // Act
    component.logout();

    // Assert - isLoggedIn should be false, service should be called, router should navigate
    expect(component.isLoggedIn).toBeFalse();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('auth/login');
  });

  // --- login and register navigation ---

  it('should navigate to auth/login on login()', () => {
    // Act
    component.login();

    // Assert
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('auth/login');
  });

  it('should navigate to auth/register on register()', () => {
    // Act
    component.register();

    // Assert
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('auth/register');
  });

  // --- matchUrlPath ---

  it('should return true when router URL contains the given path', () => {
    // Arrange - router.url returns '/quiz/leaderboard' (set in beforeEach)

    // Act
    const result = component.matchUrlPath('quiz');

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when router URL does not contain the given path', () => {
    // Arrange - router.url returns '/quiz/leaderboard'

    // Act
    const result = component.matchUrlPath('admin');

    // Assert
    expect(result).toBeFalse();
  });

  // --- location navigation ---

  it('should call location.back() on goToPreviousPage', () => {
    // Act
    component.goToPreviousPage();

    // Assert
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should call location.forward() on goToNextPage', () => {
    // Act
    component.goToNextPage();

    // Assert
    expect(mockLocation.forward).toHaveBeenCalled();
  });
});

// END AI-generated - Cursor Composer
