import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Login from '../../login/actions/login';
import * as fromLogin from '../../login/reducers';

@Injectable()
export class AdvancedUserGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromLogin.State>) { }

  canLoad(): Observable<boolean> {
    return this.isAdvancedUser();
  }

  canActivate(): Observable<boolean> {
    return this.isAdvancedUser();
  }

  private isAdvancedUser() {
    return this.store.select(fromLogin.getUser).take(1).map(user => {
      const isAdvancedUser = user && user.userRole !== 'RegularUser';
      if (!isAdvancedUser) {
        this.store.dispatch(new Login.LoginRedirect());
      }
      return isAdvancedUser;
    });
  }
}
