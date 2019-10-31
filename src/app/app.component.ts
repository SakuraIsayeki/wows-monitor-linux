import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { BaseComponent } from './components/base.component';

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

    if (environment.production) {
      this.router.navigateByUrl('/');
    }

    this.isStable.subscribe(() => {
      this.ngZone.run(() => {
      });
    });
  }
  
}
