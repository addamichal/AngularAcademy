import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromRegister from './register';

export interface State extends fromRoot.State {
  register: fromRegister.State;
}

export const reducers = {
  register: fromRegister.reducer
};

export const selectRegister = createFeatureSelector<State>('register');
export const selectRegisterRegister = createSelector(selectRegister, (state: State) => state.register);

export const getRegisterError = createSelector(
  selectRegisterRegister,
  fromRegister.getError
);

export const getRegisterPending = createSelector(
  selectRegisterRegister,
  fromRegister.getPending
);

export const getRegisterSuccess = createSelector(
  selectRegisterRegister,
  fromRegister.getSuccess
);
