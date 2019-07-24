import { ipcMain, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as logger from 'electron-log';

export function initUpdater(logger: logger.IElectronLog, win: BrowserWindow, isDebug: boolean) {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

  ipcMain.on('checkForUpdate', (event, args) => {
    logger.debug('[Electron]', '(checkForUpdate)');
    if (isDebug) {
      win.webContents.send('update-not-available');
    } else {
      autoUpdater.checkForUpdates();
    }
  });

  ipcMain.on('quitAndInstall', (event, args) => {
    logger.debug('[Electron]', '(quitAndInstall)');
    autoUpdater.quitAndInstall();
  });

  autoUpdater.on('checking-for-update', () => {
    logger.debug('[Electron]', '(checking-for-update)');
    win.webContents.send('checking-for-update');
  });

  autoUpdater.on('update-available', (info) => {
    logger.debug('[Electron]', '(update-available)');
    win.webContents.send('update-available');
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-not-available', (info) => {
    logger.debug('[Electron]', '(update-not-available)');
    win.webContents.send('update-not-available');
  });

  autoUpdater.on('update-error', (err) => {
    logger.debug('[Electron]', '(update-error)');
    win.webContents.send('update-error', err);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    logger.debug('[Electron]', '(download-progress)');
    win.webContents.send('download-progress', progressObj);
  });

  autoUpdater.on('update-downloaded', (info) => {
    logger.debug('[Electron]', '(update-downloaded)');
    win.webContents.send('update-downloaded');
  });
}
