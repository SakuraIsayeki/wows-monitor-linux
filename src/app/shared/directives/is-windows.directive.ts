import { Directive, OnInit, TemplateRef, ViewContainerRef, Inject } from '@angular/core';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';

@Directive({
  selector: '[isWindows]'
})
export class IsWindowsDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    @Inject(ElectronServiceToken) private electronService: ElectronService
  ) { }

  ngOnInit() {
    if (this.electronService.isWindows()) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
