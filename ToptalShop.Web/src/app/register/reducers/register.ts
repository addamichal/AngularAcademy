import * as register from '../actions/register';
import { HttpErrorResponse } from '@angular/common/http';
import { clone } from 'lodash';

export interface State {
  error: HttpErrorResponse | null;
  pending: false;
}

export const initialState: State = {
  error: null,
  pending: false
};

export function reducer(state = initialState, action: register.Actions) {
  const stateClone = clone(state);
  switch (action.type) {
    case register.REGISTER: {
      stateClone.error = null;
      stateClone.pending = true;
      return stateClone;
    }
    case register.REGISTER_SUCCESS: {
      stateClone.pending = false;
      stateClone.error = null;
      return stateClone;
    }
    case register.REGISTER_FAILURE: {
      stateClone.pending = false;
      stateClone.error = action.payload;
      return stateClone;
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => {
  return state.error;
};
export const getPending = (state: State) => state.pending;
