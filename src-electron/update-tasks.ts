import { ipcMain, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';

export function initUpdater(logger: any, win: BrowserWindow) {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

  ipcMain.on('checkForUpdate', (event, args) => {
    autoUpdater.checkForUpdates();
  });

  ipcMain.on('quitAndInstall', (event, args) => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('checking-for-update', () => {
    win.webContents.send('checking-for-update');
  })
  autoUpdater.on('update-available', (info) => {
    win.webContents.send('update-available');
    autoUpdater.downloadUpdate();
  })
  autoUpdater.on('update-not-available', (info) => {
    win.webContents.send('update-available');
  })
  autoUpdater.on('update-error', (err) => {
    win.webContents.send('update-error', err);
  })
  autoUpdater.on('download-progress', (progressObj) => {
    win.webContents.send('download-progress', progressObj);
  })
  autoUpdater.on('update-downloaded', (info) => {
    win.webContents.send('update-downloaded');
  });
}
