import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    TableModule,
    CardModule
  ],
})
export class SharedModule {}
