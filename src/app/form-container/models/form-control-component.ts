import { AbstractControl, FormControl } from '@angular/forms';

export class FormControlElement  {
  public readonly control: AbstractControl = new FormControl();
  public controlLabel: string;
}
