import { Component, OnInit } from '@angular/core';
import * as fromAuth from '../reducers';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as auth from '../actions/auth';
import { Authenticate } from '../models/user';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  active = true;
  form: FormGroup;
  error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['addamichal@gmail.com', [Validators.required]],
      password: ['Michal@Adda!1', [Validators.required]]
    });

    this.error$ = this.store.select(fromAuth.getLoginPageError);
    this.store.select(fromAuth.getLoginPagePending)
      .subscribe(pending => {
        if (pending) {
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
  }

  submit() {
    const model = <Authenticate>Object.assign({}, this.form.value);
    this.store.dispatch(new auth.Login(model));
  }
}
