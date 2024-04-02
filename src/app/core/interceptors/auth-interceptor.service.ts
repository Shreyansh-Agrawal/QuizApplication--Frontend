import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('refresh')) {
      console.log('Auth interceptor for refresh endpoint');
      const refresh_token = sessionStorage.getItem('refresh_token');
      const authorizedRequest = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${refresh_token}`),
      });
      return next.handle(authorizedRequest);
    }
    else {
      const access_token = sessionStorage.getItem('access_token');
      const authorizedRequest = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${access_token}`),
      });
  
      return next.handle(authorizedRequest);
    }
  }
}
