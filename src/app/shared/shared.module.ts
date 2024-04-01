import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { LoaderComponent } from '../utils/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [ProgressSpinnerModule],
  exports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    TableModule,
    CardModule,
    ToastModule,
    ProgressSpinnerModule,
    FloatLabelModule,
    PasswordModule,
    CalendarModule,
    LoaderComponent
  ],
})
export class SharedModule {}
