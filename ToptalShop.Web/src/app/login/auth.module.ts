import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './effects/auth.effects';
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
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthService,
    LoginTokenService,
    ProfileService
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AuthModule { }
