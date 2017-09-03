import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromLogin from './login';
import * as fromLoginPage from './login-page';

export interface LoginState {
  status: fromLogin.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  login: LoginState;
}

export const reducers = {
  status: fromLogin.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectLoginStatusState = createSelector(
  selectLoginState,
  (state: LoginState) => state.status
);
export const getLoggedIn = createSelector(
  selectLoginStatusState,
  fromLogin.getLoggedIn
);
export const getUser = createSelector(selectLoginStatusState, fromLogin.getUser);

export const selectLoginPageState = createSelector(
  selectLoginState,
  (state: LoginState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
export const getHasFinishedProfile = createSelector(
  selectLoginStatusState,
  fromLogin.getHasFinishedProfile
);
