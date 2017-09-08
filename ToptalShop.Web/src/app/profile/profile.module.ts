import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ProfileEffects } from './effects/profile.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProfileService } from './services/profile.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginGuard } from '../login/services/login-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([ProfileEffects])
  ],
  declarations: [ ProfileComponent, ProfileComponent ],
  providers: [
    ProfileService
  ],
  exports: [ ProfileComponent ]
})
export class ProfileModule {}
