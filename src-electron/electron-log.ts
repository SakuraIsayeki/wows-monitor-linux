import { ipcMain } from 'electron';

const vi = require('win-version-info');

export function initElectronLogger(logger: any) {
  ipcMain.on('log-debug', (event, args) => {
    logger.debug('[Angular Debug]', ...args);
  });

  ipcMain.on('log-warn', (event, args) => {
    logger.warn('[Angular Warn]', ...args);
  });

  ipcMain.on('log-error', (event, args) => {
    logger.error('[Angular Error]', ...args);
  });

  ipcMain.on('get-file-verion', (event, args) => {
    try {
      event.returnValue = vi(args);
    } catch (e) {
      logger.error('[Electron Error]', 'get-file-version failed', e);
      event.returnValue = null;
    }
  });
}
