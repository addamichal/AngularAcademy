import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';
import { LoginTokenService } from '../services/login-token.service';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .login(auth)
        .do(token => this.loginTokenService.setUserToken(token.access_token))
        .map(token => new Auth.TokenSuccess(token))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect()
  $tokenSuccess = this.actions$
    .ofType(Auth.TOKEN_SUCCESS)
    .map((action: Auth.TokenSuccess) => action.payload)
    .exhaustMap(token =>
      this.profileService
        .getProfile()
        .map(user => new Auth.LoginSuccess({ user }))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginFailed$ = this.actions$
    .ofType(Auth.LOGIN_FAILURE)
    .do(() => this.loginTokenService.removeUserToken());

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/login']);
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private loginTokenService: LoginTokenService,
    private profileService: ProfileService,
    private router: Router
  ) {}
}
