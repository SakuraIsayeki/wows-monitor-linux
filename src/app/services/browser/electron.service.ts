import { Injectable } from '@angular/core';
import { ElectronService } from '@interfaces/electron.service';
import { OpenDialogOptions } from 'electron';


@Injectable()
export class BrowserElectronService implements ElectronService {

  ipcRenderer: any;
  ipcMain: any;
  webFrame: any;
  childProcess: any;
  shell: any;
  fs: any;
  dialog: any;

  constructor() {
  }

  isElectron() {
    return false;
  }

  isWindows() {
    return true;
  }

  async showOpenDialog(options: OpenDialogOptions) {
    return null;
  }
}
