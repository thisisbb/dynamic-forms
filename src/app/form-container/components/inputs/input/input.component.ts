import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControlElement } from '../../../models/form-control-component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends FormControlElement {}
