// BEGIN AI-generated - Cursor Composer

import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { playerGuard } from './player.guard';
import { UserRoleService } from '../services/user-role.service';

// We test playerGuard because it restricts routes to player-only users.

describe('playerGuard', () => {
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;

  // Dummy route and state objects required by CanActivateFn signature
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    // Create a spy for the service the guard depends on
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['userRoleIsPlayer']);

    // Configure TestBed so inject() inside the guard resolves our mock
    TestBed.configureTestingModule({
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService }
      ]
    });
  });

  it('should return true for player role', () => {
    // Arrange - user has player role
    mockUserRoleService.userRoleIsPlayer.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => playerGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false for non-player role', () => {
    // Arrange - user does NOT have player role
    mockUserRoleService.userRoleIsPlayer.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => playerGuard(mockRoute, mockState));

    // Assert
    expect(result).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
