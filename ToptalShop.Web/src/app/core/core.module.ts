import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdvancedUserDirective, RolesDirective } from './directives/role.directive';

export const COMPONENTS = [
  RolesDirective,
  AdvancedUserDirective
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
}
