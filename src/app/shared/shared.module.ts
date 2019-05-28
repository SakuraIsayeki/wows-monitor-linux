import { NgModule } from '@angular/core';
import { IsDesktopDirective } from './directives/is-desktop.directive';
import { IsBrowserDirective } from './directives/is-browser.directive';
import { ShowMenuEntryDirective } from './directives/show-menu-entry.directive';
import { ShowOnDirective } from './directives/show-on.directive';

@NgModule({
  declarations: [
    IsDesktopDirective,
    IsBrowserDirective,
    ShowMenuEntryDirective,
    ShowOnDirective
  ],
  exports: [
    IsDesktopDirective,
    IsBrowserDirective,
    ShowMenuEntryDirective,
    ShowOnDirective
  ],
  imports: [],
  providers: []
})
export class SharedModule { }
