// BEGIN AI-generated - Cursor Composer

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { superAdminGuard } from './super-admin.guard';
import { UserRoleService } from '../services/user-role.service';

// We test superAdminGuard because it restricts routes to super-admin-only users.

describe('superAdminGuard', () => {
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;

  // Dummy route and state objects required by CanActivateFn signature
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    // Create a spy for the service the guard depends on
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['userRoleIsSuperAdmin']);

    // Configure TestBed so inject() inside the guard resolves our mock
    TestBed.configureTestingModule({
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService }
      ]
    });
  });

  it('should return true for super-admin role', () => {
    // Arrange - user has super-admin role
    mockUserRoleService.userRoleIsSuperAdmin.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => superAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false for non-super-admin role', () => {
    // Arrange - user does NOT have super-admin role
    mockUserRoleService.userRoleIsSuperAdmin.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => superAdminGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
