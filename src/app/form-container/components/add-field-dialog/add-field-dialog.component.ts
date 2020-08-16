import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AddFieldData } from '../../models/add-field-data';
import { FieldType } from '../../models/field-type';

@Component({
  selector: 'app-add-field-dialog',
  templateUrl: './add-field-dialog.component.html',
  styleUrls: ['./add-field-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFieldDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {formGroup: FormGroup},
    public dialogRef: MatDialogRef<AddFieldDialogComponent>) {
    this.nameControl.setValidators(this.validateName.bind(this));
  }

  public nameControl = new FormControl();

  public addFieldData = new AddFieldData();

  public fieldTypes: {label: string, value: FieldType}[] = [{
    label: 'Single line text',
    value: 'input'
  },
    {
    label: 'Multi line text',
    value: 'textarea'
  },
    {
    label: 'Date',
    value: 'date'
  },
    {
    label: 'Number',
    value: 'number'
  }
  ];

   private validateName(control: AbstractControl) {
    if (this.data.formGroup.controls[control.value]) {
      return {nameUsed: true};
    }
    return null;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
