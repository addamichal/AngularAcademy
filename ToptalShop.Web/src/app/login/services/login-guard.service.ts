import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Login from '../actions/login';
import * as fromLogin from '../reducers';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private store: Store<fromLogin.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromLogin.getLoggedIn).take(1).map(loggedIn => {
      if (!loggedIn) {
        this.store.dispatch(new Login.LoginRedirect());
        return false;
      }

      return true;
    });
  }
}
