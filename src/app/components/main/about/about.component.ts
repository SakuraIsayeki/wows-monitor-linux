import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { appConfig } from 'src/config/app.config';

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
