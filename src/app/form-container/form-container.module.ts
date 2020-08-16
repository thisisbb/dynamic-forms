import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AddFieldDialogComponent } from './components/add-field-dialog/add-field-dialog.component';
import { FormContainerComponent } from './components/container/form-container.component';
import { FormResultComponent } from './components/form-result/form-result.component';
import { FormComponent } from './components/form/form.component';
import { DateComponent } from './components/inputs/date/date.component';
import { FieldWrapperComponent } from './components/inputs/field-wrapper/field-wrapper.component';
import { InputComponent } from './components/inputs/input/input.component';
import { NumberComponent } from './components/inputs/number/number.component';
import { TextareaComponent } from './components/inputs/textarea/textarea.component';
import { FormStorageService } from './services/form-storage.service';

@NgModule({
  declarations: [FormContainerComponent,
    FormComponent, FormResultComponent, FieldWrapperComponent, InputComponent, TextareaComponent, DateComponent, NumberComponent,
    AddFieldDialogComponent],
  // entryComponents: [
  //   FieldWrapperComponent, InputComponent, TextareaComponent, DateComponent, NumberComponent,
  //
  // ]
  providers: [FormStorageService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [FormContainerComponent]
})
export class FormContainerModule { }
