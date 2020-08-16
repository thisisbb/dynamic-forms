import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, take } from 'rxjs/operators';

import { AddFieldData } from '../../models/add-field-data';
import { FormStorageService } from '../../services/form-storage.service';
import { AddFieldDialogComponent } from '../add-field-dialog/add-field-dialog.component';
import { FieldWrapperComponent } from '../inputs/field-wrapper/field-wrapper.component';

type DataHolder = Record<string, AddFieldData>;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements AfterViewInit {

  @ViewChild(NgForm, { static: true })
  public ngForm: NgForm;

  @ViewChild('fieldContainer', { static: true, read: ViewContainerRef })
  public fieldContainer: ViewContainerRef;

  @Output()
  public formSubmit = new EventEmitter<Object>();

  public formGroup = new FormGroup({});

  private readonly dataHolder: DataHolder = {};

  constructor(public readonly dialog: MatDialog,
              private readonly resolver: ComponentFactoryResolver,
              private readonly cdr: ChangeDetectorRef,
              private readonly formStorageService: FormStorageService,
              ) {}

  public ngAfterViewInit(): void {
    const savedForm = this.formStorageService.getForm();
    if (!savedForm) {
      return;
    }

    Object.values(savedForm)
      .filter(Boolean)
      .forEach((addFieldData) => {
        this.createComponent(addFieldData as any as AddFieldData, false);
      });
  }

  public submitForm(): void {
    this.formSubmit.emit(this.formGroup.getRawValue());
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddFieldDialogComponent, {
      width: '250px',
      data: {
        formGroup: this.formGroup
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(Boolean))
      .subscribe((data: AddFieldData) => this.createComponent(data));
  }

  public createComponent(data: AddFieldData, sync = true): void {
    this.addToDataHolder(data, sync);
    const factory = this.resolver.resolveComponentFactory(FieldWrapperComponent);
    const componentRef = this.fieldContainer.createComponent(factory);
    const createdControl = componentRef.instance.createField(data);

    if (data.required) {
      createdControl.setValidators(Validators.required);
    }

    this.formGroup.addControl(data.name, createdControl);
    createdControl.updateValueAndValidity();

    this.cdr.markForCheck();

    componentRef.instance.remove.pipe(take(1)).subscribe((controlName: string) => {
      this.removeFromDataHolder(data);
      this.formGroup.removeControl(controlName);
      componentRef.destroy();
    });
  }

  private addToDataHolder(data: AddFieldData, sync: boolean): void {
    this.dataHolder[data.name] = data;
    sync && this.syncDataWithStorage();
  }

  private removeFromDataHolder(data: AddFieldData): void {
    delete this.dataHolder[data.name];
    this.syncDataWithStorage();
  }

  private syncDataWithStorage(): void {
    console.log('sync', this.dataHolder);
    this.formStorageService.setForm(JSON.stringify(this.dataHolder));
  }

  public submitDisabled(): boolean {
    return !Object.keys(this.formGroup.controls).length || this.formGroup.invalid;
  }

}
