import { app, BrowserWindow, clipboard, dialog, ipcMain, screen } from 'electron';
import * as logger from 'electron-log';
import * as fs from 'fs/promises';

export function initIpcModule(win: BrowserWindow) {
  ipcMain.handle('restart', async (event, args) => {
    app.relaunch();
    app.exit();
  });

  ipcMain.handle('take-screenshot', async (event, args) => {
    logger.debug('[Electron]', '(take-screenshot)');

    await takeScreenshot(win, args);
  });

  ipcMain.handle('open-file-dialog', async (event, args) => {
    const result = await dialog.showOpenDialog(win, args);
    return result;
  });

  ipcMain.handle('get-window-and-screen-info', async (event) => {
    const window = BrowserWindow.getAllWindows()[0];
    const windowSize = window.getSize();
    const windowBounds = window.getBounds();
    const display = screen.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y });
    return {
      sizeX: windowSize[0],
      sizeY: windowSize[1],
      displayWidth: display.size.width,
      displayHeight: display.size.height
    };
  });



  initWindowFunction(win);
}

async function takeScreenshot(win: BrowserWindow, args) {
  const result = await win.webContents.capturePage(args.rect ?? null);
  if (args.path) {
    const path = args.path + '/' + args.filename;
    await fs.writeFile(path, result.toPNG());
    clipboard.writeImage(result, 'selection');
    logger.debug('[Electron]', '(save-screenshot)', path);
  } else {
    clipboard.writeImage(result, 'selection');
  }
}

function initWindowFunction(win: BrowserWindow) {

  ipcMain.handle('get-win-state', async () => {
    const state = {
      maximizable: win.maximizable,
      isMaximized: win.isMaximized(),
      minimizable: win.minimizable,
      closable: win.closable
    };
    return state;
  });

  ipcMain.handle('minimize-win', async () => win.minimize());
  ipcMain.handle('maximize-win', async () => win.maximize());
  ipcMain.handle('restore-win', async () => win.restore());
  ipcMain.handle('close-win', async () => win.close());
  win
    .on('show', () => win.webContents.send('win-show'))
    .on('maximize', () => win.webContents.send('win-maximize'))
    .on('unmaximize', () => win.webContents.send('win-unmaximize'))
    .on('minimize', () => win.webContents.send('win-minimize'))
    .on('restore', () => win.webContents.send('win-restore'))
    .on('resized', () => win.webContents.send('win-resized'))
    .on('move', () => win.webContents.send('win-move'));
}
