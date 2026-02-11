// BEGIN AI-generated - Cursor Composer

import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { UserRoleService } from '../services/user-role.service';

// We test authGuard because it controls route access based on login status.
// If the user is not logged in, it should redirect to the login page.

describe('authGuard', () => {
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;
  let mockRouter: jasmine.SpyObj<Router>;

  // Dummy route and state objects required by CanActivateFn signature
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    // Create spy objects for the dependencies the guard injects
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['getLoginStatus']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    // Configure TestBed so inject() inside the guard resolves our mocks
    TestBed.configureTestingModule({
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should return true when user is logged in', () => {
    // Arrange - user is logged in
    mockUserRoleService.getLoginStatus.and.returnValue(true);

    // Act - run the guard inside the TestBed injection context
    const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

    // Assert - guard allows access
    expect(result).toBeTrue();
    // Router.navigateByUrl should NOT have been called
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should navigate to /auth/login when user is not logged in', () => {
    // Arrange - user is NOT logged in
    mockUserRoleService.getLoginStatus.and.returnValue(false);

    // Act
    TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

    // Assert - the guard should redirect to the login page
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});

// END AI-generated - Cursor Composer
