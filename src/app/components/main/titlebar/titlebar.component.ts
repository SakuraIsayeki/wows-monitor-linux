import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ElectronService } from 'src/app/services/desktop/electron.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html'
})
export class TitlebarComponent extends BaseComponent implements OnInit {

  private get window() {
    return this.electronService.remote.BrowserWindow.getFocusedWindow();
  }

  constructor(private electronService: ElectronService) {
    super();
  }

  ngOnInit() {
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
  }

  public close() {
    if (this.window.isClosable()) {
      this.electronService.remote.BrowserWindow.getFocusedWindow().close();
    }
  }
}
