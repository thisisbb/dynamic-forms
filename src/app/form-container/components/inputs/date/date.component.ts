import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControlElement } from '../../../models/form-control-component';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent extends FormControlElement {}
