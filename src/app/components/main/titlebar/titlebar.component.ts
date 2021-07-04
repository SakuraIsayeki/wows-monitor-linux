import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { staticValues } from '@environments/static-values';
import { faGavel, faPodcast, faWindowClose, faWindowMaximize, faWindowMinimize, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { ElectronService, ElectronServiceToken } from '@interfaces/electron.service';
import { GatewayService } from '@services/gateway.service';
import { Subject } from 'rxjs';

declare type WindowState = {
  maximizable: boolean;
  isMaximized: boolean;
  minimizable: boolean;
  closable: boolean;
}

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html'
})
export class TitlebarComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  closeIcon = faWindowClose;
  maximizeIcon = faWindowMaximize;
  restoreIcon = faWindowRestore;
  minimizeIcon = faWindowMinimize;

  get title() {
    return staticValues.applicationName;
  }

  constructor(@Inject(ElectronServiceToken) private electronService: ElectronService) {
    super();
  }

  private checkState = new Subject();
  public windowState: WindowState;

  ngOnInit() {
    this.electronService.ipcRenderer
      .on('win-show', () => this.checkState.next(true))
      .on('win-maximize', () => this.checkState.next(true))
      .on('win-unmaximize', () => this.checkState.next(true))
      .on('win-minimize', () => this.checkState.next(true))
      .on('win-restore', () => this.checkState.next(true))
      .on('win-resized', () => this.checkState.next(true))
      .on('win-move', () => this.checkState.next(true));

    this.checkState
      //.pipe(debounceTime(10))
      .subscribe(() => this.resolveState());
    this.checkState.next(true);
  }

  ngAfterViewInit() {
  }

  private async resolveState() {
    this.windowState = await this.electronService.ipcRenderer.invoke('get-win-state');
  }

  async minimize() {
    if (this.windowState.minimizable) {
      await this.electronService.ipcRenderer.invoke('minimize-win');
    }
  }

  async maximize() {
    if (this.windowState.maximizable && !this.windowState.isMaximized) {
      await this.electronService.ipcRenderer.invoke('maximize-win');
    } else {
      await this.electronService.ipcRenderer.invoke('restore-win');
    }
  }

  async close() {
    if (this.windowState.closable) {
      await this.electronService.ipcRenderer.invoke('close-win');
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
