import * as order from '../actions/order';
import { HttpErrorResponse } from '@angular/common/http';
import { clone } from 'lodash';

export interface State {
  error: HttpErrorResponse | null;
  deleteError: HttpErrorResponse | null;
  pending: boolean;
  success: boolean;
  deleteSuccess: boolean;
}

export const initialState: State = {
  error: null,
  deleteError: null,
  pending: false,
  success: false,
  deleteSuccess: false
};

export function reducer(state = initialState, action: order.Actions) {
  const stateClone = clone(state);
  switch (action.type) {
    case order.SAVE_ORDER: {
      stateClone.error = null;
      stateClone.pending = true;
      stateClone.success = false;
      return stateClone;
    }
    case order.SAVE_ORDER_SUCCESS: {
      stateClone.pending = false;
      stateClone.error = null;
      stateClone.success = true;
      return stateClone;
    }
    case order.SAVE_ORDER_FAILURE: {
      stateClone.pending = false;
      stateClone.error = action.payload;
      stateClone.success = false;
      return stateClone;
    }
    case order.SAVE_ORDER_RESET: {
      return initialState;
    }
    case order.DELETE_ORDER: {
      stateClone.deleteError = null;
      stateClone.deleteSuccess = false;
      return stateClone;
    }
    case order.DELETE_ORDER_SUCCESS: {
      stateClone.deleteError = null;
      stateClone.deleteSuccess = true;
      return stateClone;
    }
    case order.DELETE_ORDER_FAILURE: {
      stateClone.deleteError = action.payload;
      stateClone.deleteSuccess = false;
      return stateClone;
    }

    default: {
      return state;
    }
  }
}

export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;
export const getSuccess = (state: State) => state.success;
export const getDeleteError = (state: State) => state.deleteError;
export const getDeleteSuccess = (state: State) => state.deleteSuccess;
