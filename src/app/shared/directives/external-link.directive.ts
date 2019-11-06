

import { Directive, OnInit, ElementRef, Renderer2, Optional } from '@angular/core';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[externalLink]'
})
export class ExternalLinkDirective implements OnInit {

  constructor(
    @Optional() private electronService: ElectronService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (environment.desktop) {
      this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target.tagName === 'A') {
          this.electronService.shell.openExternal(target.getAttribute('href'));
        }
      });
    }
  }
}
