import { InjectionToken } from '@angular/core';
import * as childProcess from 'child_process';
import { IpcMain, IpcRenderer, OpenDialogOptions, Shell, WebFrame } from 'electron';
import * as fs from 'fs';

export const ElectronServiceToken = new InjectionToken('electron-service');

export class ElectronService {

  ipcRenderer: IpcRenderer;
  ipcMain: IpcMain;
  webFrame: WebFrame;
  childProcess: typeof childProcess;
  shell: Shell;
  fs: typeof fs.promises;
  isElectron: () => boolean;
  isWindows: () => boolean;
  showOpenDialog: (options: OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue>;
}
