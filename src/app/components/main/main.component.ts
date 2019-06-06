import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  setTitle(title: string) {

  }
}
