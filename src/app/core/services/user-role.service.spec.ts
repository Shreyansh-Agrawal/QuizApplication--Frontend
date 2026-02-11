// BEGIN AI-generated - Cursor Composer

import { UserRoleService } from './user-role.service';
import { Roles } from '../../shared/constants/roles.constants';

// We test UserRoleService because it contains pure logic for JWT decoding,
// role mapping, and login status checks. These are security-critical functions.

describe('UserRoleService', () => {
  let service: UserRoleService;

  beforeEach(() => {
    // Create a fresh service instance before each test
    service = new UserRoleService();
    // Clear sessionStorage so tests don't leak state into each other
    sessionStorage.clear();
  });

  // --- getAccessToken ---

  it('should return access token when sessionStorage has one', () => {
    // Arrange - store a fake token in sessionStorage
    sessionStorage.setItem('access_token', 'fake-token-123');

    // Act - call the method under test
    const result = service.getAccessToken();

    // Assert - the token should be returned as-is
    expect(result).toBe('fake-token-123');
  });

  it('should return null when sessionStorage has no access token', () => {
    // Arrange - sessionStorage is already empty from beforeEach

    // Act
    const result = service.getAccessToken();

    // Assert - sessionStorage.getItem returns null when key is missing
    expect(result).toBeNull();
  });

  // --- getLoginStatus ---

  it('should return true when access_token exists in sessionStorage', () => {
    // Arrange - store a token so the user appears logged in
    sessionStorage.setItem('access_token', 'some-token');

    // Act
    const result = service.getLoginStatus();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false when access_token is absent from sessionStorage', () => {
    // Arrange - no token stored (cleared in beforeEach)

    // Act
    const result = service.getLoginStatus();

    // Assert
    expect(result).toBeFalse();
  });

  // --- getRoleFromMapping ---
  // This method maps encoded role strings to human-readable role constants.

  it('should return super-admin for SFAB6c mapping', () => {
    // Arrange - the encoded value for super-admin
    const mappedRole = 'SFAB6c';

    // Act
    const result = service.getRoleFromMapping(mappedRole);

    // Assert
    expect(result).toBe(Roles.superAdmin);
  });

  it('should return admin for SHVpHQ mapping', () => {
    // Arrange
    const mappedRole = 'SHVpHQ';

    // Act
    const result = service.getRoleFromMapping(mappedRole);

    // Assert
    expect(result).toBe(Roles.admin);
  });

  it('should return player for SSwYVW mapping', () => {
    // Arrange
    const mappedRole = 'SSwYVW';

    // Act
    const result = service.getRoleFromMapping(mappedRole);

    // Assert
    expect(result).toBe(Roles.player);
  });

  it('should return unknown for an unrecognized mapping', () => {
    // Arrange - a value that does not match any known role
    const mappedRole = 'INVALID_CODE';

    // Act
    const result = service.getRoleFromMapping(mappedRole);

    // Assert
    expect(result).toBe(Roles.unknown);
  });

  // --- getUserRole ---
  // getUserRole reads the JWT from sessionStorage, decodes it, and maps the role.

  it('should return empty string when no token exists', () => {
    // Arrange - no token in sessionStorage (cleared in beforeEach)

    // Act
    const result = service.getUserRole();

    // Assert - returns '' early when token is missing
    expect(result).toBe('');
  });

  it('should decode JWT and return the correct role', () => {
    // Arrange - create a valid JWT whose payload contains cap: 'SHVpHQ' (admin)
    // A JWT is three base64url segments: header.payload.signature
    const payload = { cap: 'SHVpHQ', sub: 'user1', iat: 1, exp: 9999999999 };
    const base64Payload = btoa(JSON.stringify(payload));
    const fakeJwt = `eyJhbGciOiJIUzI1NiJ9.${base64Payload}.fake-signature`;
    sessionStorage.setItem('access_token', fakeJwt);

    // Act
    const result = service.getUserRole();

    // Assert - the decoded cap 'SHVpHQ' maps to 'admin'
    expect(result).toBe(Roles.admin);
  });

  // --- userRoleIsSuperAdmin / userRoleIsAdmin / userRoleIsPlayer ---
  // These are convenience boolean methods that check getUserRole().

  it('should return true from userRoleIsSuperAdmin when role is super-admin', () => {
    // Arrange - spy on getUserRole to return the super-admin constant
    spyOn(service, 'getUserRole').and.returnValue(Roles.superAdmin);

    // Act
    const result = service.userRoleIsSuperAdmin();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsSuperAdmin when role is not super-admin', () => {
    // Arrange
    spyOn(service, 'getUserRole').and.returnValue(Roles.player);

    // Act
    const result = service.userRoleIsSuperAdmin();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true from userRoleIsAdmin when role is admin', () => {
    // Arrange
    spyOn(service, 'getUserRole').and.returnValue(Roles.admin);

    // Act
    const result = service.userRoleIsAdmin();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsAdmin when role is not admin', () => {
    // Arrange
    spyOn(service, 'getUserRole').and.returnValue(Roles.player);

    // Act
    const result = service.userRoleIsAdmin();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return true from userRoleIsPlayer when role is player', () => {
    // Arrange
    spyOn(service, 'getUserRole').and.returnValue(Roles.player);

    // Act
    const result = service.userRoleIsPlayer();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsPlayer when role is not player', () => {
    // Arrange
    spyOn(service, 'getUserRole').and.returnValue(Roles.admin);

    // Act
    const result = service.userRoleIsPlayer();

    // Assert
    expect(result).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
