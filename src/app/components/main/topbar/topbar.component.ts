import { ChangeDetectorRef, Component, OnInit, Optional, ViewChild } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faBars, faCamera, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { MatchAppModel, MatchGroup } from '@generated/models';
import { Status } from '@interfaces/signalr';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@services/api.service';
import { ScreenshotService } from '@services/desktop/screenshot.service';
import { GatewayService } from '@services/gateway.service';
import { SettingsService } from '@services/settings.service';
import { SelectItem } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent extends BaseComponent implements OnInit {

  @ViewChild(MenuComponent, { static: true })
  appMenu: MenuComponent;

  menuIcon = faBars;
  expandIcon = faExpand;
  compressIcon = faCompress;
  cameraIcon = faCamera;
  sidebarVisible = false;

  modes: SelectItem[] = [
    {
      label: this.translateService.instant('monitor.matchGroup.PVP'),
      value: 'PVP'
    },
    {
      label: this.translateService.instant('monitor.matchGroup.RANKED'),
      value: 'RANKED'
    },
    {
      label: this.translateService.instant('monitor.matchGroup.CLAN'),
      value: 'CLAN'
    },
    {
      label: this.translateService.instant('monitor.matchGroup.COOPERATIVE'),
      value: 'COOPERATIVE'
    },
    {
      label: this.translateService.instant('monitor.matchGroup.PVE'),
      value: 'PVE'
    },
    {
      label: this.translateService.instant('monitor.matchGroup.BRAWL'),
      value: 'BRAWL'
    },
    {
      label: this.translateService.instant('monitor.matchGroup.EVENT'),
      value: 'EVENT'
    }
  ];

  constructor(
    private translateService: TranslateService,
    public signalrService: GatewayService,
    public apiService: ApiService,
    public settingsService: SettingsService,
    private cd: ChangeDetectorRef,
    @Optional() public screenshotService: ScreenshotService
  ) {
    super();
  }

  ngOnInit() {
    document.documentElement.onfullscreenchange = () => {
      this.isFullscreen = document.fullscreenElement != null;
    };

    combineLatest([
      this.signalrService.status$,
      this.signalrService.info$
    ])
      .pipe(this.untilDestroy()).subscribe(arr => {
      const status = arr[0] as Status;
      const info = arr[1] as MatchAppModel;
      if (status === Status.Fetching) {
        this.settingsService.form.forcePVP.disable({emitEvent: false});
      } else if (info && info.matchGroup !== MatchGroup.PVP && info.matchGroup !== MatchGroup.CLAN && info.matchGroup !== MatchGroup.BRAWL){
        this.settingsService.form.forcePVP.enable({emitEvent: false});
      }
      this.cd.detectChanges();
    });

    this.settingsService.form.forcePVP.valueChanges.pipe(this.untilDestroy()).subscribe(() => this.apiService.resendState());
  }

  isFullscreen = false;

  async fullscreenSwitch() {
    if (this.isFullscreen) {
      try {
        await document.exitFullscreen();
      } catch {
      }
    } else {
      await document.documentElement.requestFullscreen();
      this.isFullscreen = true;
      try {
        await screen.orientation.lock('landscape');
      } catch {
      }
    }
  }

  toggleSidebar = () => {
    this.sidebarVisible = !this.sidebarVisible;
  };

  async changeForcePVP() {

  }
}
