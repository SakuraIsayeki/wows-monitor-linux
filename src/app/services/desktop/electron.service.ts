import { Injectable } from '@angular/core';
import * as childProcess from 'child_process';
import { IpcMain, ipcRenderer, remote, webFrame, dialog, shell } from 'electron';
import * as fs from 'fs';

declare global {
  interface Window {
    require: any;
    process: any;
  }
}

@Injectable()
export class ElectronService {

  public ipcRenderer: typeof ipcRenderer;
  public ipcMain: IpcMain;
  public webFrame: typeof webFrame;
  public remote: typeof remote;
  public childProcess: typeof childProcess;
  public shell: typeof shell;
  public fs: typeof fs;
  public dialog: typeof dialog;

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

}
