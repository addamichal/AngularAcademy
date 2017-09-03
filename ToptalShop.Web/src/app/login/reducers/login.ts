import * as login from '../actions/login';
import { User } from '../models/user';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

// TODO remove test values
export const initialState: State = {
  loggedIn: true,
  user: {
    email: 'addamichal@toptal.com',
    userRole: 'regularUser',
    billingAddress: null,
    shippingAddress: null
  },
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
