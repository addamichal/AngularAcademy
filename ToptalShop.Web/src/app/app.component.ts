import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as products from './catalog/actions/products';
import * as login from './login/actions/login';
import * as fromRoot from './reducers';
import * as fromLogin from './login/reducers';
import { Observable } from 'rxjs/Observable';
declare var paypal: any;

export const CREATE_PAYMENT_URL  = 'http://localhost:5261/api/paypalpayment';
export const EXECUTE_PAYMENT_URL = 'http://localhost:5261/api/paypalpaymentexecute';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn$ = this.store.select(fromLogin.getLoggedIn);
  }

  logout() {
    this.store.dispatch(new login.Logout());
  }
}
