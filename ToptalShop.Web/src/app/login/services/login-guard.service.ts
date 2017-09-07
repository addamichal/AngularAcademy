import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Login from '../actions/login';
import * as fromLogin from '../reducers';

@Injectable()
export class LoginGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromLogin.State>) {}

  canActivate(): Observable<boolean> {
    return this.isLoggedIn();
  }

  canLoad(): Observable<boolean> {
    return this.isLoggedIn();
  }

  isLoggedIn() {
    return this.store.select(fromLogin.getLoggedIn).take(1).map(loggedIn => {
      if (!loggedIn) {
        this.store.dispatch(new Login.LoginRedirect());
        return false;
      }

      return true;
    });
  }
}
