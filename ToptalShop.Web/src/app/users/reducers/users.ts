import * as users from '../actions/users';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user';

export interface State {
  usersLoaded: boolean;
  users: User[];
}

export const initialState: State = {
  usersLoaded: false,
  users: []
};

export function reducer(
  state = initialState,
  action: users.Actions): State {

  switch (action.type) {
    case users.LOAD_USERS_SUCCESS: {
      const users = action.payload;
      return {
        usersLoaded: true,
        users: users,
      };
    }
  }

  return state;
}

export const getUsers = (state: State) => state.users;
export const getUsersLoaded = (state: State) => state.usersLoaded;
