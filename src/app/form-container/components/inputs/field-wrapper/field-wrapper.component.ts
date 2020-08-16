import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { AddFieldData } from '../../../models/add-field-data';
import { FieldType } from '../../../models/field-type';
import { FormControlElement } from '../../../models/form-control-component';
import { DateComponent } from '../date/date.component';
import { InputComponent } from '../input/input.component';
import { NumberComponent } from '../number/number.component';
import { TextareaComponent } from '../textarea/textarea.component';

type ComponentType = typeof InputComponent | typeof TextareaComponent | typeof DateComponent | typeof NumberComponent;

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './field-wrapper.component.html',
  styleUrls: ['./field-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldWrapperComponent {

  private static readonly fieldTypeMap: Record<FieldType, ComponentType> = {
    input: InputComponent,
    textarea: TextareaComponent,
    date: DateComponent,
    number: NumberComponent,
  };

  @ViewChild('field', { static: true, read: ViewContainerRef })
  public fieldContainerRef: ViewContainerRef;

  @Output()
  public remove = new EventEmitter<string>();

  private name: string;

  private fieldRef: ComponentRef<FormControlElement> | undefined;

  constructor(private readonly resolver: ComponentFactoryResolver,
              private readonly cdr: ChangeDetectorRef) { }

  public createField(data: AddFieldData): AbstractControl {
    this.name = data.name;
    const component = FieldWrapperComponent.fieldTypeMap[data.type];
    if (!component) {
      return;
    }
    const factory = this.resolver.resolveComponentFactory<FormControlElement>(component);

    this.fieldRef = this.fieldContainerRef.createComponent(factory);
    this.fieldRef.instance.controlLabel = data.label;
    this.fieldRef.instance.control.markAllAsTouched();

    this.cdr.detectChanges();

    return this.fieldRef.instance.control;
  }

  public removeControl(): void {
    this.remove.emit(this.name);
    this.destroyFieldRef();
  }

  private destroyFieldRef(): void {
    if (this.fieldRef) {
      this.fieldRef.destroy();
      this.fieldRef = undefined;
    }
  }
}
