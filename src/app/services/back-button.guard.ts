import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AppComponent } from '../app.component';

@Injectable()
export class BackButtonGuard implements CanDeactivate<any> {
  constructor() { }
  canDeactivate(component: any) {
    // will prevent user from going back
    if (AppComponent.backButtonFired) {
      AppComponent.backButtonFired = false;
      // push current state again to prevent further attempts.
      history.pushState(null, null, location.href);
      return false;
    }
    return true;
  }
}
