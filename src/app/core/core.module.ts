import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    ConfirmationService,
    MessageService,
  ],
})
export class CoreModule {}
