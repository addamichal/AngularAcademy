import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './components/order-list.component';
import { OrderComponent } from './components/order.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { OrdersEffects } from './effects/orders.effects';
import { EffectsModule } from '@ngrx/effects';
import { OrderService } from './services/order.service';
import { OrdersLoadedGuard } from './services/orders-loaded.guard.service';
import { OrderExistGuard } from './services/order-exists.guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'orders/:id', component: OrderComponent, canActivate: [OrdersLoadedGuard, OrderExistGuard] },
      { path: 'orders', component: OrderListComponent, canActivate: [OrdersLoadedGuard] }
    ]),
    StoreModule.forFeature('orders', reducers),
    EffectsModule.forFeature([OrdersEffects])
  ],
  declarations: [ OrderComponent, OrderListComponent ],
  providers: [
    OrderService,
    OrdersLoadedGuard,
    OrderExistGuard,
  ],
  exports: [ OrderComponent, OrderListComponent ]
})
export class OrdersModule {}
