import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormResultComponent {

  @Input()
  public data: Object | undefined;

}
