import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ClanInfo, Region, TeamAverage } from '@generated/models';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { Config } from '@config/config';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent extends BaseComponent implements OnInit {

  @Input()
  clan: ClanInfo;

  @Input()
  team: TeamAverage;

  @Input()
  cw: boolean;

  showDialog = false;

  @ViewChild('wowsNumbersLink', { static: false })
  wowsNumbersLink: ElementRef<HTMLLinkElement>;
  @ViewChild('wowsKarmaLink', { static: false })
  wowsKarmaLink: ElementRef<HTMLLinkElement>;


  items: MenuItem[];

  get shipWinrate() {
    if (this.config.teamWinrate === 'weighted') {
      return this.team.weightedShipWinrate;
    } else if (this.config.teamWinrate === 'median') {
      return this.team.medianShipWinrate;
    }
    return this.team.shipWinrate;
  }

  get overallWinrate() {
    if (this.config.teamWinrate === 'weighted') {
      return this.team.weightedOverallWinrate;
    } else if (this.config.teamWinrate === 'median') {
      return this.team.medianOverallWinrate;
    }
    return this.team.overallWinrate;
  }

  constructor(public el: ElementRef,
    private config: Config,
    @Inject(ElectronServiceToken) private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
    this.items = [
      {
        label: this.translateService.instant('monitor.teamPopup.info'),
        command: () => this.showDialog = true
      },
      {
        label: this.translateService.instant('monitor.teamPopup.wowsNumbers'),
        command: this.openWowsNumbers
      }/*,
      {
        label: this.translateService.instant('monitor.teamPopup.wowsKarma'),
        command: this.openWowsKarma
      }*/
    ];
  }

  openWowsNumbers(): void {
    if (this.isBrowserApp) {
      window.open(this.wowsNumbersLink.nativeElement.href, '_blank');
    } else {
      this.electronService.shell.openExternal(this.wowsNumbersLink.nativeElement.href);
    }
  }

  openWowsKarma(): void {
    if (this.isBrowserApp) {
      window.open(this.wowsKarmaLink.nativeElement.href, '_blank');
    } else {
      this.electronService.shell.openExternal(this.wowsKarmaLink.nativeElement.href);
    }
  }
}
