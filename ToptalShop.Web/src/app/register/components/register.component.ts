import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { RegistrationInfo } from '../models/registration-info';
import { Store } from '@ngrx/store';
import * as fromRegister from '../reducers';
import * as register from '../actions/register';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerSuccess = false;
  recaptchaKey = environment.recaptchaKey;
  active = true;

  form: FormGroup;

  formErrors = {
    '': '',
    form: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  validationMessages = {
    form: {
      match: 'Passwords must match'
    },
    email: {
      required: 'Please enter Email',
      email: 'Please enter Valid Email'
    },
    password: {
      required: 'Please enter Password',
      minlength: 'Password must have at least 6 characters'
    },
    confirmPassword: {
      required: 'Please repeat Password'
    },
    recaptcha: {
      required: 'Recaptcha is required'
    }
  };

  constructor(private fb: FormBuilder, private store: Store<fromRegister.State>) {
    this.store.dispatch(new register.RegisterReset());
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      recaptcha: [null, [Validators.required]]
    }, { validator: passwordMatcher });

    this.registerValidation(this.form, this.formErrors, this.validationMessages);

    this.store.select(fromRegister.getRegisterPagePending)
    .takeWhile(() => this.active)
    .subscribe(pending => {
      if (pending) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    this.store.select(fromRegister.getRegisterPageSuccess)
      .takeWhile(() => this.active)
      .subscribe((success) => {
        if (success) {
          this.store.dispatch(new register.RegisterReset());
          this.form.reset();
          this.registerSuccess = true;
        }
      });

    this.store.select(fromRegister.getRegisterPageError)
      .takeWhile(() => this.active)
      .subscribe(error => this.catchBadRequest(error, this.formErrors))
    ;
  }

  ngOnDestroy() {
    this.active = false;
  }

  submit() {
    const model = <RegistrationInfo>Object.assign({}, this.form.value);
    this.store.dispatch(new register.Register(model));
  }

  // TODO refactor away
  catchBadRequest(errorResponse: HttpErrorResponse, formErrors: any): Observable<any> {
    this.formErrors[''] = '';
    if (errorResponse && errorResponse.status === 400) {
      const modelState = errorResponse.error.modelState;
      for (const field of Object.keys(modelState)) {
        if (formErrors.hasOwnProperty(field)) {
          formErrors[field] = modelState[field].slice(0, 1);
        } else {
          formErrors[''] = modelState[field].join(' ');
        }
      }
      return Observable.of();
    }
  }

    // TODO refactor away
    private registerValidation(formGroup: FormGroup, formErrors: any, validationMessages: any) {
      Object.keys(formGroup.controls).forEach(key => {
        const formControl = formGroup.get(key);
        formControl.valueChanges.subscribe(value => this.setMessage(key, formControl, formErrors, validationMessages));
      });

      formGroup.valueChanges.subscribe(() => {

        formErrors['form'] = '';
        if (formGroup.errors) {
          formErrors['form'] = Object.keys(formGroup.errors).map(key => validationMessages['form'][key]).slice(0, 1);
        }
      });
    }

    private setMessage(controlName: string, c: AbstractControl, formErrors: any, validationMessages: any): void {
      formErrors[controlName] = '';
      if ((c.touched || c.dirty) && c.errors) {
        formErrors[controlName] = Object.keys(c.errors).map(key => validationMessages[controlName][key]).slice(0, 1);
      }
    }
}

function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  const passwordControl = c.get('password');
  const confirmPasswordControl = c.get('confirmPassword');

  if (passwordControl.pristine || confirmPasswordControl.pristine) {
    return null;
  }

  if (!passwordControl.value || !confirmPasswordControl.value) {
    return null;
  }

  if (passwordControl.value === confirmPasswordControl.value) {
      return null;
  }
  return { 'match': true };
}
