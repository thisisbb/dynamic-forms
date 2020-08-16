import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent {
  public formData: Object | undefined;

  constructor(private readonly cdr: ChangeDetectorRef) {}
  public onFormSubmit(formData: Object) {
    this.formData = formData;
    this.cdr.markForCheck();
  }

}
