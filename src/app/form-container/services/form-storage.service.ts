import { Injectable } from '@angular/core';

@Injectable()
export class FormStorageService {

  private static readonly formKey = 'form';

  public setForm(form: string): void {
    window.localStorage.setItem(FormStorageService.formKey, form);
  }

  public getForm(): Object | null {
    try {
      return JSON.parse(window.localStorage.getItem(FormStorageService.formKey));

    } catch (e) {
      console.log(e);
    }

  }
}
