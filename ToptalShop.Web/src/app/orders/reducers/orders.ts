import * as orders from '../actions/orders';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order, OrderLine } from '../models/order';

export interface State {
  ordersLoaded: boolean;
  orders: Order[];
}

export const initialState: State = {
  ordersLoaded: false,
  orders: []
};

export function reducer(
  state = initialState,
  action: orders.Actions): State {

  switch (action.type) {
    case orders.LOAD_ORDERS_SUCCESS: {
      const orders = action.payload;
      return {
        ordersLoaded: true,
        orders: orders,
      };
    }
  }

  return state;
}

export const getOrders = (state: State) => state.orders;
export const getOrdersLoaded = (state: State) => state.ordersLoaded;
