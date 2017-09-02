import * as profile from '../actions/profile';
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

export function reducer(state = initialState, action: profile.Actions) {
  const stateClone = clone(state);
  switch (action.type) {
    case profile.UPDATE_PROFILE: {
      stateClone.error = null;
      stateClone.pending = true;
      return stateClone;
    }
    case profile.UPDATE_PROFILE_SUCCESS: {
      stateClone.pending = false;
      stateClone.error = null;
      return stateClone;
    }
    case profile.UPDATE_PROFILE_FAILURE: {
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
