// BEGIN AI-generated - Cursor Composer

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { adminSuperAdminGuard } from './admin-super-admin.guard';
import { UserRoleService } from '../services/user-role.service';

// We test adminSuperAdminGuard because it allows access to both admin AND
// super-admin roles. The OR logic needs to be verified for all role combinations.

describe('adminSuperAdminGuard', () => {
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;

  // Dummy route and state objects required by CanActivateFn signature
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    // Create spies for both role-check methods the guard uses
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', [
      'userRoleIsAdmin',
      'userRoleIsSuperAdmin'
    ]);

    // Configure TestBed so inject() inside the guard resolves our mock
    TestBed.configureTestingModule({
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService }
      ]
    });
  });

  it('should return true for admin role', () => {
    // Arrange - user is admin but not super-admin
    mockUserRoleService.userRoleIsAdmin.and.returnValue(true);
    mockUserRoleService.userRoleIsSuperAdmin.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => adminSuperAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeTrue();
  });

  it('should return true for super-admin role', () => {
    // Arrange - user is super-admin but not admin
    mockUserRoleService.userRoleIsAdmin.and.returnValue(false);
    mockUserRoleService.userRoleIsSuperAdmin.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => adminSuperAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false for player role (neither admin nor super-admin)', () => {
    // Arrange - user is neither admin nor super-admin (e.g. a player)
    mockUserRoleService.userRoleIsAdmin.and.returnValue(false);
    mockUserRoleService.userRoleIsSuperAdmin.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => adminSuperAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
