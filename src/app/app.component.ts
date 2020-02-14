import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from './components/base.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) {
    super();
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
