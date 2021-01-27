import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { faPaintBrush, faWifi } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { filter, map } from 'rxjs/operators';
import { SignalrService, SignalrServiceToken } from 'src/app/interfaces/signalr.service';
import { Config } from 'src/config/config';
import { PlayerInfo } from '../../../generated/models/player-info';
import { ElectronService, ElectronServiceToken } from '../../../interfaces/electron.service';
import { WowsKarmaPipe } from '../../../shared/pipes/wows-karma.pipe';
import { WowsNumbersPipe } from '../../../shared/pipes/wows-numbers.pipe';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnInit, AfterViewInit {

  faWifi = faWifi;
  faPaintBrush = faPaintBrush;

  // Player Menu for Website links
  items: MenuItem[] = [];

  @ViewChild(ContextMenu)
  contextMenu: ContextMenu;

  get $fontSizeClass() {
    return this.config.$fontsize.pipe(map(fz => 'fz-' + fz));
  }

  constructor(
    @Inject(SignalrServiceToken) public signalrService: SignalrService,
    @Optional() @Inject(ElectronServiceToken) private electronService: ElectronService,
    public config: Config
  ) {
    super();
  }

  ngOnInit() {
    this.signalrService.$info.pipe(this.untilDestroy(), filter(i => i != null)).subscribe(() => {
      this.uiSuccess('matchUpdated');
    });
  }

  ngAfterViewInit() {

  }

  clickPlayer(event: MouseEvent, player: PlayerInfo) {
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

  openWowsNumbers(player: PlayerInfo) {
    const baseUrl = WowsNumbersPipe.staticTransform(player.region);
    const url = `${baseUrl}player/${player.accountId},${player.name}/`;
    if (this.isBrowser) {
      window.open(url, '_blank');
    } else {
      this.electronService.shell.openExternal(url);
    }
    this.contextMenu.hide();
  }

  openWowsKarma(player: PlayerInfo) {
    const baseUrl = WowsKarmaPipe.staticTransform(player.region);
    const url = `${baseUrl}player/${player.accountId},${player.name}/`;
    if (this.isBrowser) {
      window.open(url, '_blank');
    } else {
      this.electronService.shell.openExternal(url);
    }
    this.contextMenu.hide();
  }
}
