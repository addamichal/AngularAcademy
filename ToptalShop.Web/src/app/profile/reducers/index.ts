import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromProfile from './profile';

export interface State extends fromRoot.State {
  profile: fromProfile.State;
}

export const reducers = {
  profile: fromProfile.reducer
};

export const selectProfile = createFeatureSelector<State>('profile');
export const selectProfileProfile = createSelector(selectProfile, (state: State) => state.profile);

export const getProfileError = createSelector(
  selectProfileProfile,
  fromProfile.getError
);

export const getProfilePending = createSelector(
  selectProfileProfile,
  fromProfile.getPending
);
