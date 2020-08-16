import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControlElement } from '../../../models/form-control-component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends FormControlElement {}
