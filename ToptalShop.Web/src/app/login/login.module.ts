import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginService } from './services/login.service';
import { LoginGuard } from './services/login-guard.service';
import { LoginEffects } from './effects/login.effects';
import { reducers } from './reducers';
import { LoginComponent } from './components/login.component';
import { HttpModule } from '@angular/http';
import { LoginTokenService } from './services/login-token.service';
import { ProfileService } from './services/profile.service';

export const COMPONENTS = [LoginComponent];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
    StoreModule.forFeature('login', reducers),
    EffectsModule.forFeature([LoginEffects]),
  ],
  providers: [
    LoginService,
    LoginTokenService,
    ProfileService
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class LoginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: this,
      providers: [LoginService, LoginGuard],
    };
  }
}
