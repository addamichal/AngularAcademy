import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromOrdersPage from './orders';

export interface State extends fromRoot.State {
  ordersPage: fromOrdersPage.State;
}

export const reducers = {
  ordersPage: fromOrdersPage.reducer
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
