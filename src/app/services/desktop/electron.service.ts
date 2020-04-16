import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';
import { IpcMain, ipcRenderer, remote, webFrame, dialog, shell } from 'electron';
import * as fs from 'fs';
import * as os from 'os';
import { ElectronService } from 'src/app/interfaces/electron.service';

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
  remote: typeof remote;
  childProcess: typeof childProcess;
  shell: typeof shell;
  fs: typeof fs;
  dialog: typeof dialog;
  os: typeof os;

  constructor() {
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcMain = window.require('electron').ipcMain;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.shell = window.require('electron').shell;
      this.fs = window.require('fs');
      this.dialog = this.remote.dialog;
    }
  }

  isElectron() {
    return window && window.process && window.process.type;
  }

  isWindows() {
    return os.platform() === 'win32';
  }

}
