import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private fb: FormBuilder) {
  }

  public group(controlsConfig: { [key: string]: any; }): FormGroup {
    return this.fb.group(controlsConfig);
  }

  public check(form: FormGroup): boolean {
    let valid = true;
    for (const i in form.controls) {
      if (form.controls.hasOwnProperty(i)) {
        const item = form.controls[i];
        if (Object.getPrototypeOf(form.controls[i]) === FormGroup.prototype) {
          const result = this.check(item as FormGroup);
          if (!result) {
            valid = result;
          }
        } else {
          item.markAsDirty();
          item.updateValueAndValidity();
          if (item.invalid) {
            valid = false;
          }
        }
      }
    }
    return valid;
  }

  public hasError(form: FormGroup, controlName: string, errorName: string): boolean {
    return form.controls[controlName].hasError(errorName);
  }

  public setLoading(form: FormGroup, loading: boolean): void {
    for (const i in form.controls) {
      if (form.controls.hasOwnProperty(i)) {
        const item = form.controls[i];
        if (Object.getPrototypeOf(form.controls[i]) === FormGroup.prototype) {
          this.setLoading(item as FormGroup, loading);
        } else {
          if (loading) {
            item.disable({
              emitEvent: false
            });
          } else {
            item.enable({
              emitEvent: false
            });
          }
        }
      }
    }
  }

}
