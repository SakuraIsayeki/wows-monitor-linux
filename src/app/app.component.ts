import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from './components/base.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {


  constructor(
    private router: Router,
    private translateService: TranslateService,
    private config: Config
  ) {
    super();
  }

  ngOnInit() {
    this.translateService.addLangs(['en']);
    this.translateService.setDefaultLang(this.translateService.getBrowserLang());

    if (environment.production) {
      this.router.navigateByUrl('/');
    }


    this.isStable.subscribe(() => {
      this.ngZone.run(() => {

      });
    });
  }
}
