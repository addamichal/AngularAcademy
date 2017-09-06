import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list.component';
import { UserComponent } from './components/user.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { UsersEffects } from './effects/users.effects';
import { UserEffects } from './effects/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { UserService } from './services/user.service';
import { UsersLoadedGuard } from './services/users-loaded.guard.service';
import { UserExistGuard } from './services/user-exists.guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { AdminGuard } from '../login/services/admin-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'users/add', component: UserComponent, pathMatch: 'full', canActivate: [UsersLoadedGuard, AdminGuard] },
      { path: 'users/update/:id', component: UserComponent, canActivate: [UsersLoadedGuard, AdminGuard] },
      { path: 'users', component: UserListComponent, canActivate: [UsersLoadedGuard, AdminGuard] }
    ]),
    ReactiveFormsModule,
    SweetAlert2Module,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature([UsersEffects, UserEffects])
  ],
  declarations: [ UserComponent, UserListComponent ],
  providers: [
    UserService,
    UsersLoadedGuard,
    UserExistGuard,
  ],
  exports: [ UserComponent, UserListComponent ]
})
export class UsersModule {}
