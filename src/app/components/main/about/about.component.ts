import { Component, OnInit } from '@angular/core';
import { appConfig } from '@config/app.config';
import { BaseComponent } from '@components/base.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent extends BaseComponent implements OnInit {

  get version(){
    return appConfig.version;
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
