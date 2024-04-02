import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from '../utils/loader/loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [ProgressSpinnerModule, AccordionModule],
  exports: [
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DividerModule,
    DropdownModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    LoaderComponent,
  ],
})
export class SharedModule {}
