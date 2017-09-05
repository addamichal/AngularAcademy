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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'products/add', component: ProductComponent, pathMatch: 'full', canActivate: [ProductsLoadedGuard] },
      { path: 'products/update/:id', component: ProductComponent, canActivate: [ProductsLoadedGuard] },
      { path: 'products', component: ProductListComponent, canActivate: [ProductsLoadedGuard] }
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
