import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import * as fromLogin from '../../login/reducers';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[roles]'
})
export class RolesDirective implements OnDestroy {
  active = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<fromLogin.State>
  ) { }

  @Input() set roles(roles: string[]) {
    this.store.select(fromLogin.getUser)
      .takeWhile(() => this.active)
      .subscribe(user => {
        this.viewContainer.clear();

        if (user && roles.some(role => user.userRole === role)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    );
  }

  ngOnDestroy() {
    this.active = false;
  }
}

@Directive({
  selector: '[advanced-user]'
})
export class AdvancedUserDirective implements OnInit, OnDestroy {
  active = true;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<fromLogin.State>
  ) { }

  ngOnInit() {
    this.store.select(fromLogin.getUser)
    .takeWhile(() => this.active)
    .subscribe(user => {
      this.viewContainer.clear();

      if (user && user.userRole !== 'RegularUser') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  );
  }

  ngOnDestroy() {
    this.active = false;
  }
}
