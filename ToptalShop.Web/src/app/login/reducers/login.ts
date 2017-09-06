import * as login from '../actions/login';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

// TODO remove test values
export const initialState: State = {
  loggedIn: false,
  user: null
  //user: {
  //  id: '3382160c-e170-48fc-bbe2-50bc289b1401',
  //  email: 'aaa',
  //  userRole: 'Administrator',
  //  billingAddress: null,
  //  shippingAddress: null
  //},
};

export function reducer(state = initialState, action: login.Actions): State {
  switch (action.type) {
    case login.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
      };
    }

    case login.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getHasFinishedProfile = (state: State) => {
  return !!(state.user && state.user.shippingAddress && state.user.billingAddress);
};
