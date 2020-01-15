import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { faBars, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import { SignalrService, SignalrServiceToken } from 'src/app/interfaces/signalr.service';
import { BaseComponent } from '../../base.component';
import { MenuComponent } from './menu/menu.component';
import { SelectItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';

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
    }
  ];

  constructor(@Inject(SignalrServiceToken) public signalrService: SignalrService,
    public apiService: ApiService
  ) {
    super();
  }

  ngOnInit() {
    document.documentElement.onfullscreenchange = event => {
      this.isFullscreen = document.fullscreenElement != null;
    }
  }

  isFullscreen = false;

  async fullscreenSwitch() {
    if (this.isFullscreen) {
      try {
        document.exitFullscreen();
      } catch { }
    } else {
      await document.documentElement.requestFullscreen();
      this.isFullscreen = true;
      try {
        await screen.orientation.lock('landscape');
      } catch { }
    }
  }

  toggleSidebar = () => {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
