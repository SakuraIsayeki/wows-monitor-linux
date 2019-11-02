import { AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ResizeService } from '../../services/resize.service';

declare type DeviceType = 'mobile' | 'phablet' | 'tablet' | 'desktop' | 'desktopHd';

const mediaQueries: { [s in DeviceType]: string } = {
  mobile: '(max-width: 399px)',
  phablet: '(max-width: 549px)',
  tablet: '(max-width: 749px)',
  desktop: '(max-width: 999px)',
  desktopHd: '(max-width: 1199px)'
};

const mediaQueriesReversed: { [s in DeviceType]: string } = {
  mobile: '(min-width: 0xp)',
  phablet: '(min-width: 400px)',
  tablet: '(min-width: 550px)',
  desktop: '(min-width: 750px)',
  desktopHd: '(min-width: 1000px)'
};

@Directive({
  selector: '[showOn]'
})
export class ShowOnDirective implements AfterViewInit {

  private deviceType: DeviceType;
  private reversed = false;

  @Input()
  set showOn(value: DeviceType) {
    this.deviceType = value;
  }

  @Input()
  set showOnHigher(value: boolean) {
    this.reversed = value;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resizeService: ResizeService,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    if (window && window.matchMedia) {
      this.resizeService.$resizeListener.subscribe(() => {
        this.check();
      });
      this.check();
    }
  }

  static checkStatic(deviceType: DeviceType, reversed: boolean) {
    const queries = reversed ? mediaQueriesReversed : mediaQueries;
    if (window.matchMedia(queries[deviceType]).matches) {
      return true;
    }
    return false;
  }

  private check() {
    const queries = this.reversed ? mediaQueriesReversed : mediaQueries;
    if (window.matchMedia(queries[this.deviceType]).matches) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.cd.detectChanges();
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
