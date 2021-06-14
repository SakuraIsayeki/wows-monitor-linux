import { Component, Input, OnInit } from '@angular/core';
import { ClanRating } from '@generated/models';

@Component({
  selector: 'app-clanrating-info',
  templateUrl: './clanrating-info.component.html'
})
export class ClanratingInfoComponent implements OnInit {

  @Input()
  rating: ClanRating;

  constructor() { }

  ngOnInit() {
  }

}
