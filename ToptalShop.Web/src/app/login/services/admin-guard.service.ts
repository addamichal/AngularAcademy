import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Login from '../../login/actions/login';
import * as fromLogin from '../../login/reducers';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromLogin.State>) { }

  canActivate(): Observable<boolean> {
    return this.isAdmin();
  }

  canLoad(route: Route): Observable<boolean> {
    return this.isAdmin();
  }

  private isAdmin() {
    return this.store.select(fromLogin.getUser).take(1).map(user => {
      const isAdmin = user && user.userRole === 'Admin';
      if (!isAdmin) {
        this.store.dispatch(new Login.LoginRedirect());
      }
      return isAdmin;
    });
  }
}
