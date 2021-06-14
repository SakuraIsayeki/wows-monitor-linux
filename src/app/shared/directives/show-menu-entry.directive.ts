import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { environment } from '@environments/environment';
import { MenuEntry } from '@interfaces/menu-entry';

@Directive({
  selector: '[showMenuEntry]'
})
export class ShowMenuEntryDirective implements OnInit {

  private _entry: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() { }

  @Input()
  set showMenuEntry(value: MenuEntry) {
    if ((value.browser == null && value.desktop == null) ||
      (value.browser && environment.browser) ||
      (value.desktop && environment.desktop)) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
