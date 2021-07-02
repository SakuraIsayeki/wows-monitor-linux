import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faStar as faStar } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretUp, faSort, faStar as faStarSolid, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CwClanAppModel, CwHistoryEntryAppModel } from '@generated/models';

@Component({
  selector: 'app-match-item-team',
  templateUrl: './match-item-team.component.html'
})
export class MatchItemTeamComponent extends BaseComponent implements OnInit {

  faStarSolid = faStarSolid;
  faStar = faStar;

  @Input()
  clan: CwClanAppModel;

  @Input()
  entry: CwHistoryEntryAppModel;

  @Input()
  season: number;

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


  @HostListener('click', ['$event'])
  click(event: any) {
    if (this.clan) {
      this.router.navigateByUrl(`/clanwars/${this.clan.id}/${this.season}`, { state: { prevUrl: location.pathname } });
    }
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
