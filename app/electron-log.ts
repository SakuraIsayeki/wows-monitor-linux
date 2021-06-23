import { dialog, ipcMain,  } from 'electron';
import * as logger from 'electron-log';

export function initElectronLogger() {
  ipcMain.on('log-debug', (event, args) => {
    logger.debug('[Angular Debug]', ...args);
  });

  ipcMain.on('log-warn', (event, args) => {
    logger.warn('[Angular Warn]', ...args);
  });

  ipcMain.on('log-error', (event, args) => {
    logger.error('[Angular Error]', ...args);
  });
}
