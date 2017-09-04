import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
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
import { LoginModule } from './login/login.module';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExceptionInterceptor } from './services/exception-interceptor';
import { TokenInterceptor } from './services/token-interceptor';
import { ProductsLoadedGuard } from './product-list/services/products-loaded.guard.service';
import { ProductExistGuard } from './product-list/services/product-exists.guard.service';
import { RegisterModule } from './register/register.module';
import { ProfileModule } from './profile/profile.module';
import { RecaptchaModule, } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    CartSummaryComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    LoginModule.forRoot(),
    RegisterModule,
    OrdersModule,
    ProfileModule,
    RouterModule.forRoot([
      {
        path: 'products/:id',
        component: ProductDetailsComponent,
        canActivate: [ProductsLoadedGuard, ProductExistGuard]
      },
      { path: 'products', component: ProductListComponent, canActivate: [ProductsLoadedGuard] },
      { path: 'cart', component: CartDetailsComponent, canActivate: [ProductsLoadedGuard] },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProductsEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  providers: [
    ProductsLoadedGuard,
    ProductExistGuard,
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: ExceptionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
