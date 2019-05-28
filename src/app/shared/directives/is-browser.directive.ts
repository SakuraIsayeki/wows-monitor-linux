import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[isBrowser]'
})
export class IsBrowserDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    if (environment.browser) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
