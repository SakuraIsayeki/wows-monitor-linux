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
  clanId: string;

  @HostBinding('class.normal')
  normal = true;

  @HostBinding('class.inverted')
  get inverted() {
    return !this.normal;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.clanId) {
      if (parseInt(this.clanId, 0) === this.match.looserId) {
        this.normal = false;
      }
    }
  }

}
