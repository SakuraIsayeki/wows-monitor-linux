import { Injectable } from '@angular/core';
import { ElectronService } from 'src/app/interfaces/electron.service';


@Injectable()
export class BrowserElectronService implements ElectronService {

  ipcRenderer: any;
  ipcMain: any;
  webFrame: any;
  remote: any;
  childProcess: any;
  shell: any;
  fs: any;
  dialog: any;

  constructor() {
  }

  isElectron() {
    return false;
  }

}
