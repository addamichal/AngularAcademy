import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CartSummaryComponent } from './catalog/components/cart-summary.component';
import { ProductListComponent } from './catalog/components/product-list.component';
import { ProductDetailsComponent } from './catalog/components/product-details.component';
import { reducers, metaReducers } from './reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './catalog/effects/products';
import { ProductService } from './catalog/services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { CartDetailsComponent } from './catalog/components/cart-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import { ToasterModule } from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExceptionInterceptor } from './services/exception-interceptor';
import { TokenInterceptor } from './services/token-interceptor';
import { ProductsLoadedGuard } from './catalog/services/products-loaded.guard.service';
import { ProductExistGuard } from './catalog/services/product-exists.guard.service';
import { RegisterModule } from './register/register.module';
import { RecaptchaModule, } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { CoreModule } from './core/core.module';
import { AdminGuard } from './login/services/admin-guard.service';
import { AdvancedUserGuard } from './login/services/advanced-user-guard.service';
import { LoginGuard } from './login/services/login-guard.service';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';


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
    CoreModule,
    NgHttpLoaderModule,
    LoginModule.forRoot(),
    RegisterModule,
    RouterModule.forRoot([
      {
        path: 'catalog/:id',
        component: ProductDetailsComponent,
        canActivate: [ProductsLoadedGuard, ProductExistGuard]
      },
      { path: 'catalog', component: ProductListComponent, canActivate: [ProductsLoadedGuard] },
      { path: 'cart', component: CartDetailsComponent, canActivate: [ProductsLoadedGuard] },
      {
        path: 'users',
        loadChildren: 'app/users/users.module#UsersModule',
        canLoad: [AdminGuard]
      },
      {
        path: 'products',
        loadChildren: 'app/products/products.module#ProductsModule',
        canLoad: [AdvancedUserGuard]
      },
      {
        path: 'orders',
        loadChildren: 'app/orders/orders.module#OrdersModule',
        canLoad: [LoginGuard]
      },
      {
        path: 'profile',
        loadChildren: 'app/profile/profile.module#ProfileModule',
        canLoad: [LoginGuard]
      },
      { path: '', redirectTo: 'catalog', pathMatch: 'full' }
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProductsEffects]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    SweetAlert2Module
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
