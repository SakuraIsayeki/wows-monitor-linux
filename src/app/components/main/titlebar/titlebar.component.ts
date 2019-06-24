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
  canMaximize = true;

  get window() {
    return this.electronService.remote.BrowserWindow.getFocusedWindow();
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
    interval(200).pipe(this.untilDestroy(), skipWhile(() => !this.window), take(1)).subscribe(() => {
      this.canMaximize = this.window.isMaximizable();
    });
  }

  minimize() {
    if (this.window.isMinimizable()) {
      this.window.minimize();
    }
  }

  maximize() {
    if (this.window.isMaximized()) {
      this.window.unmaximize();
    } else if (this.window.isMaximizable()) {
      this.window.maximize();
    }
    this.canMaximize = this.window.isMaximizable();
  }

  close() {
    if (this.window.isClosable()) {
      this.electronService.remote.BrowserWindow.getFocusedWindow().close();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
