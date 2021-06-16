import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { staticValues } from '@environments/static-values';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent extends BaseComponent implements OnInit {

  get version() {
    return staticValues.version;
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
