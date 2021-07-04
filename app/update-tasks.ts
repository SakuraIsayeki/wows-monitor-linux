import { BrowserWindow, ipcMain } from 'electron';
import * as electronLogger from 'electron-log';
import { autoUpdater } from 'electron-updater';
import { loadConfig } from './load-config';

export function initUpdater(logger: electronLogger.ElectronLog, win: BrowserWindow, isDebug: boolean) {
  let allowBeta = false;

  loadConfig(win).then(config => {
    try {
      allowBeta = JSON.parse(config).monitorConfig.allowBeta;
    } catch (error) {
      logger.error('[Electron]', '(initUpdater)', 'Error reading config json', error);
    }
    autoUpdater.channel = allowBeta ? 'beta' : 'latest';
  });




  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;

  const isPortable = process.env.PORTABLE_EXECUTABLE_DIR != null;
  if(isPortable){
    logger.info('[Electron]', 'Portable app detected');
  }


  ipcMain.on('checkForUpdate', (event, args) => {
    logger.debug('[Electron]', '(checkForUpdate)');
    if (isDebug || isPortable) {
      win.webContents.send('update-not-available');
    } else {
      autoUpdater.checkForUpdates();
    }
  });

  ipcMain.on('quitAndInstall', (event, args) => {
    logger.debug('[Electron]', '(quitAndInstall)');
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('checking-for-update', () => {
    logger.debug('[Electron]', '(checking-for-update)');
    win.webContents.send('checking-for-update');
  });

  autoUpdater.on('update-available', (info) => {
    logger.debug('[Electron]', '(update-available)');
    win.webContents.send('update-available');
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
    autoUpdater.quitAndInstall();
  });
}
