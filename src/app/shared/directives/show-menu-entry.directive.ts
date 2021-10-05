import { Directive, Inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from '@environments/environment';
import { MenuEntry } from '@interfaces/menu-entry';
import { JwtAuthService } from '@services/jwt-auth.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[showMenuEntry]'
})
export class ShowMenuEntryDirective implements OnInit, OnDestroy {

  private _entry: MenuEntry;
  private subscription: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService
  ) {
  }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated$.subscribe(() => {
      if (this._entry) {
        this.checkDisplay();
      }
    });
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  @Input()
  set showMenuEntry(value: MenuEntry) {
    this._entry = value;
    this.checkDisplay();
  }

  private checkDisplay() {
    const isAuth = this.authService.userInfo.isAuthenticated;
    if (
      //(!this._entry.requireAuth || (this._entry.requireAuth && isAuth)) &&
      (this._entry.browser == null && this._entry.desktop == null) ||
      (this._entry.browser && environment.browser) ||
      (this._entry.desktop && environment.desktop)) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
