import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html'
})
export class MatchItemComponent extends BaseComponent implements OnInit {

  @Input()
  match: any;

  @HostBinding('class.normal')
  classNormal = true;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
