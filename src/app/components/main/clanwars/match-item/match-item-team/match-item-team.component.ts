import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { faStar as faStar } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretUp, faStar as faStarSolid, faGripLines, IconDefinition, faSort } from '@fortawesome/free-solid-svg-icons';
import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-match-item-team',
  templateUrl: './match-item-team.component.html'
})
export class MatchItemTeamComponent extends BaseComponent implements OnInit {

  faStarSolid = faStarSolid;
  faStar = faStar;

  @Input()
  clan: any;

  @Input()
  entry: any;

  @Input()
  @HostBinding('class.right')
  right: boolean;

  @HostBinding('class.empty')
  get empty() {
    return !this.entry;
  }

  globalRankIcon: IconDefinition;
  regionRankIcon: IconDefinition;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.entry) {
      this.globalRankIcon = this.getRankIcon(this.entry.globalRankDiff);
      this.regionRankIcon = this.getRankIcon(this.entry.regionRankDiff);
    }
  }

  private getRankIcon(diff: number) {
    if (diff > 0) {
      return faCaretDown;
    }
    if (diff < 0) {
      return faCaretUp;
    }
    return faSort;
  }
}
