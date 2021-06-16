import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { staticValues } from '@environments/static-values';
import { faWindowClose, faWindowMaximize, faWindowMinimize, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { MetaService } from '@stewie/meta';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { BaseComponent } from '@components/base.component';

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
    return staticValues.applicationName;
  }

  constructor(@Inject(ElectronServiceToken) private electronService: ElectronService, private metaService: MetaService) {
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
