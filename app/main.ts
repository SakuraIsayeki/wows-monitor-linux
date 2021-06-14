import { app, BrowserWindow, globalShortcut, Menu, screen, Tray } from 'electron';
import * as logger from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as WindowStateKeeper from 'electron-window-state';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { initElectronLogger } from './electron-log';
import { initUpdater } from './update-tasks';

// Initialize remote module
require('@electron/remote/main').initialize();

const isWindows = os.platform() === 'win32';

let win: BrowserWindow;
let tray: Tray;
let contextMenu: Menu;
const args = process.argv.slice(1);
const isDebug = args.some(val => val === '--serve');
// const isLocal = args.some(val => val === '--local');

if (isDebug) {
  logger.transports.file.level = 'debug';
  logger.transports.console.level = 'debug';
}

autoUpdater.logger = logger;

function appReady() {
  let isQuitting = false;

  logger.debug('[Electron]', '(appReady)', __dirname, isDebug);

  app.setAppUserModelId('com.wowsmonitor.app');

  const size = screen.getPrimaryDisplay().workAreaSize;
  const mainWindowState = WindowStateKeeper({
    defaultWidth: size.width,
    defaultHeight: size.height
  });

  const iconExt = isWindows ? 'ico' : 'png';

  const iconPath = isDebug
    ? path.join(__dirname, `../src/assets/icons/favicon-light.${iconExt}`)
    : path.join(__dirname, `../dist/desktop/assets/icons/favicon-light.${iconExt}`);

  const trayIconPath = isDebug
    ? path.join(__dirname, `../src/assets/icons/favicon-light.${iconExt}`)
    : path.join(__dirname, `../favicon-tray.${iconExt}`);

  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 650,
    frame: isWindows ? false : true,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      enableRemoteModule: true,
      allowRunningInsecureContent: isDebug ? true : false
    }
  });

  win.setMenu(null);

  mainWindowState.manage(win);

  const configBasePath = isWindows
    ? path.join(process.env.APPDATA, '@wows-monitor')
    : path.join(process.env.HOME, '.config', '@wows-monitor');

  const configPath = !isDebug ? path.join(configBasePath, 'config.json') : 'config.json';

  win.on('close', (event) => {
    const config = fs.readFileSync(configPath, { encoding: 'utf-8' });
    try {
      if (JSON.parse(config).closeToTray && !isQuitting) {
        event.preventDefault();
        win.hide();
      }
    } catch (error) {
      logger.error('[Electron]', '(onWinClose)', 'Error when reading config', error);
    }
    return false;
  });


  tray = new Tray(trayIconPath);
  contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open', click: () => {
        win.show();
      }
    },
    {
      label: 'Close', click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.addListener('click', () => {
    win.show();
  });

  tray.setContextMenu(contextMenu);

  if (isWindows) {
    initUpdater(logger, win, isDebug, configPath);
  }

  initElectronLogger(logger);
  if (isDebug) {

    globalShortcut.register('f5', () => {
      win.reload();
    });

    globalShortcut.register('f6', () => {
      win.loadURL('http://localhost:4201');
    });

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../node_modules/electron`)
    });
    win.loadURL('http://localhost:4201');

    win.webContents.openDevTools();

  } else {
    logger.error(path.join(__dirname, '../dist/desktop/index.html'));
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../dist/desktop/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  win.on('closed', () => {
    tray.destroy();
    contextMenu = null;
    win = null;
  });
}


try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', appReady);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      appReady();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
