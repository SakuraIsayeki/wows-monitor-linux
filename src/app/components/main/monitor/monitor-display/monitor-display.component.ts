import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { FontSize } from '@generated/models/font-size';
import { MatchAppModel } from '@generated/models/match-app-model';
import { PlayerAppModel } from '@generated/models/player-app-model';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { GatewayService } from '@services/gateway.service';
import { SettingsService } from '@services/settings.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-monitor-display',
  templateUrl: './monitor-display.component.html'
})
export class MonitorDisplayComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input()
  matchInfo: MatchAppModel;

  @HostBinding('class.monitor')
  public classMonitor = true;

  @ViewChildren(OverlayPanel)
  playerOverlays: QueryList<OverlayPanel>;
  selectedPlayer: PlayerAppModel;

  get $fontSizeClass() {
    return this.settingsService.form.monitorConfig.fontSize.valueChanges.pipe(startWith(this.settingsService.form.monitorConfig.fontSize.model), map((fz: FontSize) => 'fz-' + FontSize[fz]));
  }

  constructor(
    private translateService: TranslateService,
    public signalrService: GatewayService,
    @Optional() @Inject(ElectronServiceToken) private electronService: ElectronService,
    public settingsService: SettingsService
  ) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  clickPlayer(event: MouseEvent, player: PlayerAppModel, panel: OverlayPanel) {
    if (player.hidden || player.bot) {
      return;
    }
    // this.items = [
    //   {
    //     label: this.translateService.instant('monitor.playerPopup.wowsNumbers'),
    //     command: () => this.openWowsNumbers(player)
    //   },
    //   {
    //     label: this.translateService.instant('monitor.playerPopup.wowsKarma'),
    //     command: () => this.openWowsKarma(player)
    //   }
    // ];
    // this.contextMenu.toggle(event);

    for (const playerOverlay of this.playerOverlays) {
      if (playerOverlay.overlayVisible) {
        playerOverlay.hide();
      }
    }

    panel.show(event);
  }
}
