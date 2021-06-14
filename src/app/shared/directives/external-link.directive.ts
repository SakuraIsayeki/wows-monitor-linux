

import { Directive, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { environment } from '@environments/environment';

@Directive({
  selector: '[externalLink]'
})
export class ExternalLinkDirective implements OnInit {

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (environment.desktop) {
      this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target.tagName === 'A') {
          const href = target.getAttribute('href');
          if (href) {
            this.electronService.shell.openExternal(href);
          }
        }
      });
    } else {
      this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        target.setAttribute('target', '_blank');
      });
    }
  }
}
