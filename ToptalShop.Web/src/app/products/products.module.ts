import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list.component';
import { ProductComponent } from './components/product.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ProductsEffects } from './effects/products.effects';
import { ProductEffects } from './effects/product.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProductService } from './services/product.service';
import { ProductsLoadedGuard } from './services/products-loaded.guard.service';
import { ProductExistGuard } from './services/product-exists.guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { CoreModule } from '../core/core.module';
import { AdvancedUserGuard } from '../login/services/advanced-user-guard.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent, canActivate: [ProductsLoadedGuard, AdvancedUserGuard] },
      { path: 'add', component: ProductComponent, pathMatch: 'full', canActivate: [ProductsLoadedGuard, AdvancedUserGuard] },
      { path: 'update/:id', component: ProductComponent, canActivate: [ProductsLoadedGuard, AdvancedUserGuard] },
    ]),
    ReactiveFormsModule,
    SweetAlert2Module,
    StoreModule.forFeature('products', reducers),
    EffectsModule.forFeature([ProductsEffects, ProductEffects])
  ],
  declarations: [ ProductComponent, ProductListComponent ],
  providers: [
    ProductService,
    ProductsLoadedGuard,
    ProductExistGuard,
  ],
  exports: [ ProductComponent, ProductListComponent ]
})
export class ProductsModule {}
