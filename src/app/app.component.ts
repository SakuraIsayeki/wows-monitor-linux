import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from './components/base.component';
import { environment } from 'src/environments/environment';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

  static backButtonFired = false;

  constructor(
    private router: Router,
    private location: LocationStrategy
  ) {
    super();

    if (environment.desktop) {
      this.location.onPopState(() => {
        AppComponent.backButtonFired = true;
        return false;
      });
    }
  }

  ngOnInit() {
    this.translateService.addLangs(['en']);
    this.translateService.setDefaultLang('en');
    this.translateService.use(this.translateService.getBrowserLang());

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.analyticsService.config(event.urlAfterRedirects);
      }
    });

    console.warn(window.location.pathname);

    if (environment.desktop || !location.href.startsWith('/connect')) {
      this.router.navigateByUrl('/', { state: { redirUrl: window.location.pathname } });
    }
  }

}
