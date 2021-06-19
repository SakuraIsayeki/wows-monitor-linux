import { Injectable } from '@angular/core';
import { ElectronService } from '@interfaces/electron.service';
import * as childProcess from 'child_process';
import { IpcMain, ipcRenderer, OpenDialogOptions, shell, webFrame } from 'electron';
import * as fs from 'fs';
import * as os from 'os';

declare global {
  interface Window {
    require: any;
    process: any;
  }
}

@Injectable()
export class DesktopElectronService implements ElectronService {

  ipcRenderer: typeof ipcRenderer;
  ipcMain: IpcMain;
  webFrame: typeof webFrame;
  childProcess: typeof childProcess;
  shell: typeof shell;
  fs: typeof fs.promises;
  os: typeof os;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcMain = window.require('electron').ipcMain;
      this.webFrame = window.require('electron').webFrame;
      this.childProcess = window.require('child_process');
      this.shell = window.require('electron').shell;
      this.fs = window.require('fs').promises;
    }
  }

  isElectron() {
    return window && window.process && window.process.type;
  }

  isWindows() {
    return os.platform() === 'win32';
  }

  async showOpenDialog(options: OpenDialogOptions) {
    return await this.ipcRenderer.invoke('open-file-dialog', options);
  }
}
