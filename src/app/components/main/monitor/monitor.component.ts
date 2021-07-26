import { AfterViewInit, Component, HostBinding, Inject, OnInit, Optional, QueryList, ViewChildren } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faPaintBrush, faQrcode, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontSize, PlayerAppModel } from '@generated/models';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { GatewayService } from '@services/gateway.service';
import { SettingsService } from '@services/settings.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnInit, AfterViewInit {

  @HostBinding('class.monitor')
  public classMonitor = true;

  faWifi = faWifi;
  faQr = faQrcode;
  faPaintBrush = faPaintBrush;

  @ViewChildren(OverlayPanel)
  playerOverlays: QueryList<OverlayPanel>;
  selectedPlayer: PlayerAppModel;

  get $fontSizeClass() {
    return this.settingsService.form.monitorConfig.fontSize.valueChanges.pipe(startWith(this.settingsService.form.monitorConfig.fontSize.model), map(fz => 'fz-' + FontSize[fz]));
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

  // openWowsNumbers(player: PlayerAppModel) {
  //   const baseUrl = WowsNumbersPipe.staticTransform(player.region);
  //   const url = `${baseUrl}player/${player.accountId},${player.name}/`;
  //   if (this.isBrowserApp) {
  //     window.open(url, '_blank');
  //   } else {
  //     this.electronService.shell.openExternal(url);
  //   }
  //   this.contextMenu.hide();
  // }
  //
  // openWowsKarma(player: PlayerAppModel) {
  //   const baseUrl = WowsKarmaPipe.staticTransform(player.region);
  //   const url = `${baseUrl}player/${player.accountId},${player.name}/`;
  //   if (this.isBrowserApp) {
  //     window.open(url, '_blank');
  //   } else {
  //     this.electronService.shell.openExternal(url);
  //   }
  //   this.contextMenu.hide();
  // }
}
