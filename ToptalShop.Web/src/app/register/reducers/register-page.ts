import * as register from '../actions/register';
import { HttpErrorResponse } from '@angular/common/http';
import { clone } from 'lodash';

export interface State {
  error: HttpErrorResponse | null;
  pending: boolean;
  success: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
  success: false
};

export function reducer(state = initialState, action: register.Actions) {
  const stateClone = clone(state);
  switch (action.type) {
    case register.REGISTER: {
      stateClone.success = false;
      stateClone.error = null;
      stateClone.pending = true;
      return stateClone;
    }
    case register.REGISTER_SUCCESS: {
      stateClone.success = true;
      stateClone.pending = false;
      stateClone.error = null;
      return stateClone;
    }
    case register.REGISTER_FAILURE: {
      stateClone.success = false;
      stateClone.pending = false;
      stateClone.error = action.payload;
      return stateClone;
    }
    case register.REGISTER_RESET: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getSuccess = (state: State) => state.success;
export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
