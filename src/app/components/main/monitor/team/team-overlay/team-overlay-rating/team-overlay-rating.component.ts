import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { ClanRating } from '@generated/models/clan-rating';
import { Region } from '@generated/models/region';

@Component({
  selector: 'app-team-overlay-rating',
  templateUrl: './team-overlay-rating.component.html'
})
export class TeamOverlayRatingComponent extends BaseComponent implements OnInit {

  @Input()
  rating: ClanRating;

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
