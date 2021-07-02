import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ClanRatingAppModel } from '@generated/models';
import { Region } from '@generated/models/region';

@Component({
  selector: 'app-team-overlay-rating',
  templateUrl: './team-overlay-rating.component.html'
})
export class TeamOverlayRatingComponent extends BaseComponent implements OnInit {

  @Input()
  rating: ClanRatingAppModel;

  @Input()
  region: Region;

  @Input()
  leading: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
