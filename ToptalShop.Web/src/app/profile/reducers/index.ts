import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromProfile from './profile';

export interface State extends fromRoot.State {
  profilePage: fromProfile.State;
}

export const reducers = {
  profilePage: fromProfile.reducer
};

export const selectProfile = createFeatureSelector<State>('profile');
export const selectProfileProfilePage = createSelector(selectProfile, (state: State) => state.profilePage);

export const getProfilePageError = createSelector(
  selectProfileProfilePage,
  fromProfile.getError
);

export const getProfilePagePending = createSelector(
  selectProfileProfilePage,
  fromProfile.getPending
);
