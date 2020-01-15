import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { faWindowClose, faWindowMaximize, faWindowMinimize, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { MetaService } from '@ngx-meta/core';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { appConfig } from 'src/config/app.config';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html'
})
export class TitlebarComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  closeIcon = faWindowClose;
  maximizeIcon = faWindowMaximize;
  restoreIcon = faWindowRestore;
  minimizeIcon = faWindowMinimize;

  get win() {
    return this.electronService.remote.BrowserWindow.getAllWindows()[0];
  }

  get title() {
    return appConfig.applicationName;
  }

  constructor(private electronService: ElectronService, private metaService: MetaService) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  minimize() {
    if (this.win.minimizable) {
      this.win.minimize();
    }
  }

  maximize() {
    if (this.win.maximizable && !this.win.isMaximized()) {
      this.win.maximize();
    } else {
      this.win.restore();
    }
  }

  close() {
    if (this.win.closable) {
      this.electronService.remote.BrowserWindow.getFocusedWindow().close();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
