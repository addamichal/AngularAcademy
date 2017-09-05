import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromOrdersPage from './orders';
import * as fromOrder from './order';

export interface State extends fromRoot.State {
  ordersPage: fromOrdersPage.State;
  orderPage: fromOrder.State;
}

export const reducers = {
  ordersPage: fromOrdersPage.reducer,
  orderPage: fromOrder.reducer
};

export const selectOrders = createFeatureSelector<State>('orders');
export const selectOrdersPage = createSelector(selectOrders, (state: State) => state.ordersPage);

export const getOrders = createSelector(
  selectOrdersPage,
  fromOrdersPage.getOrders
);

export const getOrdersLoaded = createSelector(
  selectOrdersPage,
  fromOrdersPage.getOrdersLoaded
);

export const selectOrder = createFeatureSelector<State>('orders');
export const selectOrderOrderPage = createSelector(selectOrder, (state: State) => state.orderPage);

export const getOrderPageError = createSelector(
  selectOrderOrderPage,
  fromOrder.getError
);

export const getOrderPagePending = createSelector(
  selectOrderOrderPage,
  fromOrder.getPending
);

export const getOrderPageSuccess = createSelector(
  selectOrderOrderPage,
  fromOrder.getSuccess
);

export const getOrderPageDeleteError = createSelector(
  selectOrderOrderPage,
  fromOrder.getDeleteError
);

export const getOrderPageDeleteSuccess = createSelector(
  selectOrderOrderPage,
  fromOrder.getDeleteSuccess
);
