import { BrowserWindow, ipcMain } from 'electron';

export function initElectronLogger(logger: any) {
  ipcMain.on('log-debug', (event, args) => {
      logger.debug('[Angular Debug]', ...args);
  });

  ipcMain.on('log-error', (event, args) => {
    logger.error('[Angular Error]', ...args);
  });
}
