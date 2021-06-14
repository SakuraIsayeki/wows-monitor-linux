import { Component, OnDestroy, OnInit } from '@angular/core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { SelectItem } from 'primeng/api';
import { ClanSeason, Region } from '@generated/models';
import { ClansService } from '@generated/services';
import { ScrollService } from '@services/scroll.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-clanwars',
  templateUrl: './clanwars.component.html'
})
export class ClanwarsComponent extends BaseComponent implements OnInit, OnDestroy {

  regionOptions: SelectItem[] = [
    {
      label: Region.EU.toString(),
      value: Region.EU
    },
    {
      label: Region.NA.toString(),
      value: Region.NA
    },
    {
      label: Region.RU.toString(),
      value: Region.RU
    },
    {
      label: Region.ASIA.toString(),
      value: Region.ASIA
    }
  ];

  divisionOptions: SelectItem[] = [
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    }
  ];

  leagueOptions: SelectItem[] = [
    {
      label: '0',
      value: 0
    },
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      label: '4',
      value: 4
    }
  ];

  teamOptions: SelectItem[] = [
    {
      label: 'Alpha',
      value: 1
    },
    {
      label: 'Bravo',
      value: 2
    }
  ];

  seasonOptions: ClanSeason[] = [];

  faChevronUp = faChevronUp;

  constructor(
    private clansService: ClansService,
    public scrollService: ScrollService) {
    super();
  }

  ngOnInit() {
    this.clansService.clansSeasons().pipe(this.untilDestroy()).subscribe(seasons => this.seasonOptions = seasons);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
