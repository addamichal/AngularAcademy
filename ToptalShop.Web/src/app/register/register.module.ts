import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { RegisterEffects } from './effects/register.effects';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationService } from './services/registration.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: 'register', component: RegisterComponent }]),
    StoreModule.forFeature('register', reducers),
    EffectsModule.forFeature([RegisterEffects])
  ],
  declarations: [ RegisterComponent ],
  providers: [
    RegistrationService
  ],
  exports: [ RegisterComponent ]
})
export class RegisterModule {}
