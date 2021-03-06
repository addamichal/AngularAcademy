import * as login from '../actions/login';
import { Profile } from '../../core/models';

export interface State {
  loggedIn: boolean;
  user: Profile | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null
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
