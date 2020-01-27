import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from 'src/app/services/scroll.service';

@Directive({
  selector: '[showOnScroll]'
})
export class ShowOnScrollDirective implements OnInit, OnDestroy {

  private subscription: Subscription;
  private scrollTop: number;

  @Input()
  set showOnScroll(value: number) {
    this.scrollTop = value;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private scrollService: ScrollService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.subscription = this.scrollService.$onScroll.subscribe(scrollTop => {
      if (scrollTop > this.scrollTop) {
        if (this.viewContainer.length === 0) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.cd.detectChanges();
        }
      } else if (this.viewContainer.length > 0) {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
