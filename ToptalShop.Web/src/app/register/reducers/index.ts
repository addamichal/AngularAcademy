import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromRegisterPage from './register-page';

export interface State extends fromRoot.State {
  registerPage: fromRegisterPage.State;
}

export const reducers = {
  registerPage: fromRegisterPage.reducer
};

export const selectRegister = createFeatureSelector<State>('register');
export const selectRegisterRegisterPage = createSelector(selectRegister, (state: State) => state.registerPage);

export const getRegisterPageError = createSelector(
  selectRegisterRegisterPage,
  fromRegisterPage.getError
);

export const getRegisterPagePending = createSelector(
  selectRegisterRegisterPage,
  fromRegisterPage.getPending
);

export const getRegisterPageSuccess = createSelector(
  selectRegisterRegisterPage,
  fromRegisterPage.getSuccess
);
