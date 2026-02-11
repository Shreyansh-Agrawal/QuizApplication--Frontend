// BEGIN AI-generated - Cursor Composer

import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { AuthInterceptorService } from './auth-interceptor.service';

// We test AuthInterceptorService because it has branching logic that decides
// which token (access vs refresh) to attach. This is security-critical.

describe('AuthInterceptorService', () => {
  let interceptor: AuthInterceptorService;
  let mockHandler: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    // Create a fresh interceptor and a mock HttpHandler before each test
    interceptor = new AuthInterceptorService();
    mockHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
    // Make the mock handler return an empty observable so the chain completes
    mockHandler.handle.and.returnValue(of({} as HttpEvent<any>));
    // Clear sessionStorage so tests start clean
    sessionStorage.clear();
  });

  it('should add access_token header for normal requests', () => {
    // Arrange - store an access token and create a request to a non-refresh URL
    sessionStorage.setItem('access_token', 'my-access-token');
    const request = new HttpRequest('GET', 'https://api.example.com/v1/users');

    // Act - run the interceptor
    interceptor.intercept(request, mockHandler);

    // Assert - the handler should have been called with a cloned request
    // that has the access token in the Authorization header
    const clonedRequest: HttpRequest<any> = mockHandler.handle.calls.mostRecent().args[0];
    expect(clonedRequest.headers.get('Authorization')).toBe('Bearer my-access-token');
  });

  it('should add refresh_token header for refresh endpoint requests', () => {
    // Arrange - store a refresh token and create a request to a refresh URL
    sessionStorage.setItem('refresh_token', 'my-refresh-token');
    const request = new HttpRequest('POST', 'https://api.example.com/v1/refresh', null);

    // Act
    interceptor.intercept(request, mockHandler);

    // Assert - the refresh token should be used instead of the access token
    const clonedRequest: HttpRequest<any> = mockHandler.handle.calls.mostRecent().args[0];
    expect(clonedRequest.headers.get('Authorization')).toBe('Bearer my-refresh-token');
  });

  it('should handle missing tokens gracefully by setting Bearer null', () => {
    // Arrange - no tokens in sessionStorage (cleared in beforeEach)
    const request = new HttpRequest('GET', 'https://api.example.com/v1/data');

    // Act
    interceptor.intercept(request, mockHandler);

    // Assert - sessionStorage returns null, so the header becomes 'Bearer null'
    const clonedRequest: HttpRequest<any> = mockHandler.handle.calls.mostRecent().args[0];
    expect(clonedRequest.headers.get('Authorization')).toBe('Bearer null');
  });
});

// END AI-generated - Cursor Composer
