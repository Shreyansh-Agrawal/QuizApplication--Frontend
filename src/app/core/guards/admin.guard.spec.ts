// BEGIN AI-generated - Cursor Composer

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { adminGuard } from './admin.guard';
import { UserRoleService } from '../services/user-role.service';

// We test adminGuard because it restricts routes to admin-only users.

describe('adminGuard', () => {
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;

  // Dummy route and state objects required by CanActivateFn signature
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    // Create a spy for the service the guard depends on
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['userRoleIsAdmin']);

    // Configure TestBed so inject() inside the guard resolves our mock
    TestBed.configureTestingModule({
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService }
      ]
    });
  });

  it('should return true for admin role', () => {
    // Arrange - user has admin role
    mockUserRoleService.userRoleIsAdmin.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false for non-admin role', () => {
    // Arrange - user does NOT have admin role
    mockUserRoleService.userRoleIsAdmin.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => adminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
