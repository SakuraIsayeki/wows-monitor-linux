import { InjectionToken } from '@angular/core';

export const ElectronServiceToken = new InjectionToken('electron-service');

export class ElectronService {

  ipcRenderer: any;
  ipcMain: any;
  webFrame: any;
  remote: any;
  childProcess: any;
  shell: any;
  fs: any;
  dialog: any;
  isElectron: () => boolean;
  isWindows: () => boolean;
}
