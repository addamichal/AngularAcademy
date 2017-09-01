import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromAuth from '../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as auth from '../actions/auth';
import { Authenticate } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;

  formErrors = {
    '': '',
    email: '',
    password: ''
  };

  private validationMessages = {
    email: {
      required: 'Please enter your email address',
      email: 'Your email address is not in correct format'
    },
    password: {
      required: 'Please enter Password'
    }
  };

  loggedIn$: Observable<boolean>;
  active = true;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerValidation(this.form, this.formErrors, this.validationMessages);

    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);

    this.store.select(fromAuth.getLoginPageError)
      .takeWhile(() => this.active)
      .subscribe(e => {
        console.log('here');
        if (e && e.status === 400) {
          if (e.error.error_description) {
            this.formErrors[''] = e.error.error_description;
          }
        }
      }
    );

    this.store.select(fromAuth.getLoginPagePending)
      .takeWhile(() => this.active)
      .subscribe(pending => {
        if (pending) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
  }

  ngOnDestroy() {
    this.active = false;
  }

  submit() {
    const model = <Authenticate>Object.assign({}, this.form.value);
    this.store.dispatch(new auth.Login(model));
  }

  // TODO refactor away
  private registerValidation(formGroup: FormGroup, formErrors: any, validationMessages: any) {
    Object.keys(formGroup.controls).forEach(key => {
      const formControl = formGroup.get(key);
      formControl.valueChanges.subscribe(value => this.setMessage(key, formControl, formErrors, validationMessages));
    });
  }

  private setMessage(controlName: string, c: AbstractControl, formErrors: any, validationMessages: any): void {
    formErrors[controlName] = '';
    if ((c.touched || c.dirty) && c.errors) {
        formErrors[controlName] = Object.keys(c.errors).map(key => validationMessages[controlName][key]).slice(0, 1);
    }
  }
}
