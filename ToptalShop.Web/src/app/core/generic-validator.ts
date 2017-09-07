import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

export class GenericValidator {

  constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {
  }

  registerValidation(form: FormGroup, formErrors: any, recursive: boolean = true) {
    Object.keys(form.controls).forEach(key => {
      const formControl = form.get(key);
      formControl.valueChanges.subscribe(value => {
        this.processMessages(form, formErrors, recursive);
      });
    });
  }

  processMessages(container: FormGroup, messages: any, recursive: boolean): any {
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {

          if (recursive) {
            this.processMessages(c, messages, recursive);
          }

          messages[controlKey] = '';
          if (c.errors) {
            Object.keys(c.errors).map(messageKey => {
              if (this.validationMessages[controlKey][messageKey]) {
                if (messages[controlKey] === '') {
                  messages[controlKey] = this.validationMessages[controlKey][messageKey];
                }
              }
            });
          }
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlKey]) {
            messages[controlKey] = '';
            if ((c.dirty || c.touched) && c.errors) {
              Object.keys(c.errors).map(messageKey => {
                if (this.validationMessages[controlKey][messageKey]) {
                  if (messages[controlKey] === '') {
                    messages[controlKey] = this.validationMessages[controlKey][messageKey];
                  }
                }
              });
            }
          }
        }
      }
    }
  }
}
