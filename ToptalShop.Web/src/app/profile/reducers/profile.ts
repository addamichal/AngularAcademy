import * as profile from '../actions/profile';
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

export function reducer(state = initialState, action: profile.Actions) {
  const stateClone = clone(state);
  switch (action.type) {
    case profile.UPDATE_PROFILE: {
      stateClone.error = null;
      stateClone.pending = true;
      stateClone.success = false;
      return stateClone;
    }
    case profile.UPDATE_PROFILE_SUCCESS: {
      stateClone.pending = false;
      stateClone.error = null;
      stateClone.success = true;
      return stateClone;
    }
    case profile.UPDATE_PROFILE_FAILURE: {
      stateClone.pending = false;
      stateClone.error = action.payload;
      stateClone.success = false;
      return stateClone;
    }

    case profile.UPDATE_PROFILE_RESET: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
export const getSuccess = (state: State) => state.success;
