import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromUsersPage from './users';
import * as fromUser from './user';

export interface State extends fromRoot.State {
  usersPage: fromUsersPage.State;
  userPage: fromUser.State;
}

export const reducers = {
  usersPage: fromUsersPage.reducer,
  userPage: fromUser.reducer
};

export const selectUsers = createFeatureSelector<State>('users');
export const selectUsersPage = createSelector(selectUsers, (state: State) => state.usersPage);

export const getUsers = createSelector(
  selectUsersPage,
  fromUsersPage.getUsers
);

export const getUsersLoaded = createSelector(
  selectUsersPage,
  fromUsersPage.getUsersLoaded
);

export const selectUser = createFeatureSelector<State>('users');
export const selectUserUserPage = createSelector(selectUser, (state: State) => state.userPage);

export const getUserPageError = createSelector(
  selectUserUserPage,
  fromUser.getError
);

export const getUserPagePending = createSelector(
  selectUserUserPage,
  fromUser.getPending
);

export const getUserPageSuccess = createSelector(
  selectUserUserPage,
  fromUser.getSuccess
);
