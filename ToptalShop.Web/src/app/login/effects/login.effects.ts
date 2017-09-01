import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { LoginService } from '../services/login.service';
import * as Login from '../actions/login';
import { LoginTokenService } from '../services/login-token.service';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class LoginEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Login.LOGIN)
    .map((action: Login.Login) => action.payload)
    .exhaustMap(auth =>
      this.loginService
        .login(auth)
        .do(token => this.loginTokenService.setUserToken(token.access_token))
        .map(token => new Login.TokenSuccess(token))
        .catch(error => of(new Login.LoginFailure(error)))
    );

  @Effect()
  $tokenSuccess = this.actions$
    .ofType(Login.TOKEN_SUCCESS)
    .map((action: Login.TokenSuccess) => action.payload)
    .exhaustMap(token =>
      this.profileService
        .getProfile()
        .map(user => new Login.LoginSuccess({ user }))
        .catch(error => of(new Login.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Login.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginFailed$ = this.actions$
    .ofType(Login.LOGIN_FAILURE)
    .do(() => this.loginTokenService.removeUserToken());

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Login.LOGIN_REDIRECT, Login.LOGOUT)
    .do(loggedIn => {
      this.router.navigate(['/login']);
    });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private loginTokenService: LoginTokenService,
    private profileService: ProfileService,
    private router: Router
  ) {}
}
