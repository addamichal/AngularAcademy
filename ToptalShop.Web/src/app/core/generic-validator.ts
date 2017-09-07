import { FormGroup } from '@angular/forms';

export class GenericValidator {

  constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {
  }

  registerValidation(form: FormGroup, formErrors: any) {
    Object.keys(form.controls).forEach(key => {
      const formControl = form.get(key);
      formControl.valueChanges.debounceTime(500).subscribe(value => {
        this.processMessages(form, formErrors);
      });
    });
  }

  processMessages(container: FormGroup, messages: any): any {
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        const c = container.controls[controlKey];
        // If it is a FormGroup, process its child controls.
        if (c instanceof FormGroup) {
          this.processMessages(c, messages);

          if (c.errors) {
            messages[controlKey] = '';
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

    return messages;
  }

  getErrorCount(container: FormGroup): number {
    let errorCount = 0;
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        if (container.controls[controlKey].errors) {
          errorCount += Object.keys(container.controls[controlKey].errors).length;
          console.log(errorCount);
        }
      }
    }
    return errorCount;
  }
}
