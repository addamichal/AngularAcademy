import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromLogin from '../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import * as login from '../actions/login';
import { Authenticate } from '../models';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { GenericValidator } from '../../core/generic-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  genericValidator: GenericValidator;
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

  constructor(private fb: FormBuilder, private store: Store<fromLogin.State>) {
    this.store.dispatch(new login.LoginReset());
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.genericValidator.registerValidation(this.form, this.formErrors);

    this.loggedIn$ = this.store.select(fromLogin.getLoggedIn);

    this.store.select(fromLogin.getLoginPageError)
      .takeWhile(() => this.active)
      .subscribe(e => {
        if (e && e.status === 400) {
          if (e.error.error_description) {
            this.formErrors[''] = e.error.error_description;
          }
        }
      }
      );

    this.store.select(fromLogin.getLoginPagePending)
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
    this.store.dispatch(new login.Login(model));
  }
}
