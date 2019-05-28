import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[isDesktop]'
})
export class IsDesktopDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    if (environment.desktop) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
