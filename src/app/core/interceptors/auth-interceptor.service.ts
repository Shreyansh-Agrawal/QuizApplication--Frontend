import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Auth interceptor called');
    const access_token = sessionStorage.getItem('access_token');
    const authorizedRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${access_token}`),
    });

    return next.handle(authorizedRequest);
  }
}
