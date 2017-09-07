import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { RegistrationInfo } from '../models/registration-info';
import { Store } from '@ngrx/store';
import * as fromRegister from '../reducers';
import * as register from '../actions/register';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { catchBadRequest } from '../../core/utils';
import { passwordMatcher } from '../../core/validators';
import { GenericValidator } from '../../core/generic-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  genericValidator: GenericValidator;
  registerSuccess = false;
  recaptchaKey = environment.recaptchaKey;
  active = true;

  form: FormGroup;

  formErrors = {
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
    passwordGroup: {
      match: 'Passwords must match'
    }
  };

  constructor(private fb: FormBuilder, private store: Store<fromRegister.State>) {
    this.store.dispatch(new register.RegisterReset());
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validator: passwordMatcher }),
      recaptcha: [null, [Validators.required]]
    });

    this.genericValidator.registerValidation(this.form, this.formErrors);

    this.store.select(fromRegister.getRegisterPagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => pending ? this.form.disable() : this.form.enable());

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
      .subscribe(error => catchBadRequest(error, this.formErrors));
  }

  ngOnDestroy() {
    this.active = false;
  }

  submit() {
    const model = <RegistrationInfo>Object.assign({}, {
      email: this.form.value.email,
      password: this.form.value.passwordGroup.password,
      confirmPassword: this.form.value.passwordGroup.confirmPassword,
      recaptcha: this.form.value.recaptcha
    });
    this.store.dispatch(new register.Register(model));
  }
}
