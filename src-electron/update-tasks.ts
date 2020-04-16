import { BrowserWindow, ipcMain } from 'electron';
import * as electronLogger from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as fs from 'fs';
import * as path from 'path';

export function initUpdater(logger: electronLogger.ElectronLog, win: BrowserWindow, isDebug: boolean) {
  let allowBeta = false;
  const configPath = !isDebug ? path.join(process.env.APPDATA, '@wows-monitor', 'config.json') : 'config.json';
  if (fs.existsSync(configPath)) {
    const config = fs.readFileSync(configPath, { encoding: 'utf-8' });
    allowBeta = JSON.parse(config).allowBeta;
  } else {
  }

  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.channel = allowBeta ? 'beta' : 'latest';

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
