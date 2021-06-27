import { Directive, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { environment } from '@environments/environment';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';

@Directive({
  selector: '[externalLink]'
})
export class ExternalLinkDirective implements OnInit, OnDestroy {

  private desktopListen: () => void;
  private browserListen: () => void;

  constructor(
    @Inject(ElectronServiceToken) private electronService: ElectronService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    if (environment.desktop) {
      if (this.desktopListen) {
        this.desktopListen();
      }
      this.desktopListen = this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
        event.preventDefault();
        let target = event.target as HTMLElement;
        if (target.tagName !== 'A' && target.parentElement?.tagName === 'A') {
          target = target.parentElement;
        }
        const href = target.getAttribute('href');
        if (href) {
          this.electronService.shell.openExternal(href);
        }
      });
    } else {
      if (this.browserListen) {
        this.browserListen();
      }
      this.browserListen = this.renderer.listen(this.el.nativeElement, 'click', (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        target.setAttribute('target', '_blank');
      });
    }
  }

  ngOnDestroy() {
    if (this.desktopListen) {
      this.desktopListen();
    }
    if (this.browserListen) {
      this.browserListen();
    }
  }
}
