import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Login from '../../login/actions/login';
import * as fromLogin from '../../login/reducers';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private store: Store<fromLogin.State>) { }

  canActivate(): Observable<boolean> {
    return this.store.select(fromLogin.getUser).map(user => {
      const isAdvancedUser = user && user.userRole === 'Admin';
      if (!isAdvancedUser) {
        this.store.dispatch(new Login.LoginRedirect());
      }
      return isAdvancedUser;
    });
  }
}
