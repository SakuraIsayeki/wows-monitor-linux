import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuEntry } from 'src/app/interfaces/menu-entry';

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
  public set showMenuEntry(value: MenuEntry) {
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
