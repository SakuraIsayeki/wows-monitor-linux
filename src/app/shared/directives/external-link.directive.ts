

import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ElectronService } from 'src/app/services/desktop/electron.service';

@Directive({
  selector: '[externalLink]'
})
export class ExternalLinkDirective implements OnInit {

  constructor(
    private electronService: ElectronService,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target.tagName === 'A') {
        this.electronService.shell.openExternal(target.getAttribute('href'));
      }
    });
  }
}
