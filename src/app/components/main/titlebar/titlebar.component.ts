import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faWindowClose, faWindowMaximize, faWindowMinimize, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { MetaService } from '@ngx-meta/core';
import { interval } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { ElectronService } from 'src/app/services/desktop/electron.service';
import { BaseComponent } from '../../base.component';
import { appConfig } from 'src/config/app.config';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html'
})
export class TitlebarComponent extends BaseComponent implements OnInit, AfterViewInit {

  public closeIcon = faWindowClose;
  public maximizeIcon = faWindowMaximize;
  public restoreIcon = faWindowRestore;
  public minimizeIcon = faWindowMinimize;
  public canMaximize = true;

  public get window() {
    return this.electronService.remote.BrowserWindow.getFocusedWindow();
  }

  public get title() {
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

  public minimize() {
    if (this.window.isMinimizable()) {
      this.window.minimize();
    }
  }

  public maximize() {
    if (this.window.isMaximized()) {
      this.window.unmaximize();
    } else if (this.window.isMaximizable()) {
      this.window.maximize();
    }
    this.canMaximize = this.window.isMaximizable();
  }

  public close() {
    if (this.window.isClosable()) {
      this.electronService.remote.BrowserWindow.getFocusedWindow().close();
    }
  }
}
