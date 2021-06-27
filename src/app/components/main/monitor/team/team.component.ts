import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseComponent } from '@components/base.component';
import { ClanInfo, TeamAverage } from '@generated/models';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@services/settings.service';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

marker('monitor.cw.leagues.0');
marker('monitor.cw.leagues.1');
marker('monitor.cw.leagues.2');
marker('monitor.cw.leagues.3');
marker('monitor.cw.leagues.4');

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent extends BaseComponent implements OnInit {

  @Input()
  clan: ClanInfo;

  @Input()
  averages: TeamAverage[];

  @Input()
  cw: boolean;

  @ViewChild('clansOverlay')
  clansOverlay: OverlayPanel;

  items: MenuItem[];

  private config = this.settingsService.form.monitorConfig.model;

  constructor(
    private translateService: TranslateService,
    public el: ElementRef,
    private settingsService: SettingsService) {
    super();
  }

  ngOnInit() {
    // this.items = [
    //   {
    //     label: this.translateService.instant('monitor.teamPopup.info'),
    //     command: () => this.showDialog = true
    //   },
    //   {
    //     label: this.translateService.instant('monitor.teamPopup.wowsNumbers'),
    //     command: this.openWowsNumbers
    //   }
    // ];
  }

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.clansOverlay.show($event);
  }

  // openWowsNumbers(): void {
  //   if (this.isBrowserApp) {
  //     window.open(this.wowsNumbersLink.nativeElement.href, '_blank');
  //   } else {
  //     this.electronService.shell.openExternal(this.wowsNumbersLink.nativeElement.href);
  //   }
  // }
  //
  // openWowsKarma(): void {
  //   if (this.isBrowserApp) {
  //     window.open(this.wowsKarmaLink.nativeElement.href, '_blank');
  //   } else {
  //     this.electronService.shell.openExternal(this.wowsKarmaLink.nativeElement.href);
  //   }
  // }
}
