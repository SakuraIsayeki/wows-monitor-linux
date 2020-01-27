import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { CwClanMatch } from 'src/app/generated/models';

@Component({
  selector: 'app-match-item',
  templateUrl: './match-item.component.html'
})
export class MatchItemComponent extends BaseComponent implements OnInit {

  @Input()
  match: CwClanMatch;

  @Input()
  clanId: number;

  @HostBinding('class.normal')
  classNormal = true;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.clanId) {
      if (this.clanId === this.match.looserId) {
        this.classNormal = false;
      }
    }
  }

}
