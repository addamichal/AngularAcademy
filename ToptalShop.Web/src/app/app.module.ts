import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CartSummaryComponent } from './product-list/components/cart-summary.component';
import { ProductListComponent } from './product-list/components/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { reducers, metaReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './product-list/effects/products';
import { ProductService } from './product-list/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CartDetailsComponent } from './product-list/components/cart-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthModule } from './login/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CartSummaryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AuthModule,
    RouterModule.forRoot([
      { path: 'register', component: RegisterComponent },
      {
        path: 'products/:id',
        component: ProductDetailsComponent
      },
      { path: 'products', component: ProductListComponent },
      { path: 'cart', component: CartDetailsComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProductsEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
