import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControlElement } from '../../../models/form-control-component';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberComponent extends FormControlElement {}
