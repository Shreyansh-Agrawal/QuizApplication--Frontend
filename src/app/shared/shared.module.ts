import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { LoaderComponent } from '../utils/loader/loader.component';
import { SliceWordsPipe } from './pipes/slice-words.pipe';

@NgModule({
  declarations: [LoaderComponent, SliceWordsPipe],
  imports: [ProgressSpinnerModule, AccordionModule],
  exports: [
    AccordionModule,
    AutoCompleteModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FileUploadModule,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule,
    LoaderComponent,
    SliceWordsPipe
  ],
})
export class SharedModule {}
