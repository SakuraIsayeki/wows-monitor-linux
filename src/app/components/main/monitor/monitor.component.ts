import { AfterViewInit, Component, HostBinding, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faPaintBrush, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontSize, PlayerAppModel } from '@generated/models';
import {  } from '@generated/models';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '@services/settings.service';
import { SignalrService } from '@services/signalr.service';
import { WowsKarmaPipe } from '@shared/pipes/wows-karma.pipe';
import { WowsNumbersPipe } from '@shared/pipes/wows-numbers.pipe';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { map, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnInit, AfterViewInit {

  @HostBinding('class.monitor')
  public classMonitor = true;

  faWifi = faWifi;
  faPaintBrush = faPaintBrush;

  // Player Menu for Website links
  items: MenuItem[] = [];

  @ViewChild(ContextMenu)
  contextMenu: ContextMenu;

  get $fontSizeClass() {
    return this.settingsService.form.monitorConfig.fontSize.valueChanges.pipe(startWith(this.settingsService.form.monitorConfig.fontSize.model), map(fz => 'fz-' + FontSize[fz]));
  }

  constructor(
    private translateService: TranslateService,
    public signalrService: SignalrService,
    @Optional() @Inject(ElectronServiceToken) private electronService: ElectronService,
    public settingsService: SettingsService
  ) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  clickPlayer(event: MouseEvent, player: PlayerAppModel) {
    if (player.hidden || player.bot) {
      return;
    }
    this.items = [
      {
        label: this.translateService.instant('monitor.playerPopup.wowsNumbers'),
        command: () => this.openWowsNumbers(player)
      },
      {
        label: this.translateService.instant('monitor.playerPopup.wowsKarma'),
        command: () => this.openWowsKarma(player)
      }
    ];
    this.contextMenu.toggle(event);
  }

  openWowsNumbers(player: PlayerAppModel) {
    const baseUrl = WowsNumbersPipe.staticTransform(player.region);
    const url = `${baseUrl}player/${player.accountId},${player.name}/`;
    if (this.isBrowserApp) {
      window.open(url, '_blank');
    } else {
      this.electronService.shell.openExternal(url);
    }
    this.contextMenu.hide();
  }

  openWowsKarma(player: PlayerAppModel) {
    const baseUrl = WowsKarmaPipe.staticTransform(player.region);
    const url = `${baseUrl}player/${player.accountId},${player.name}/`;
    if (this.isBrowserApp) {
      window.open(url, '_blank');
    } else {
      this.electronService.shell.openExternal(url);
    }
    this.contextMenu.hide();
  }
}
