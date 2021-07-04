import { constructUserAgent } from '@stewieoo/signalr/dist/esm/Utils';
import { app, BrowserWindow, globalShortcut, Menu, screen, Tray } from 'electron';
import * as logger from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as WindowStateKeeper from 'electron-window-state';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { initElectronLogger } from './electron-log';
import { initIpcModule } from './ipc-module';
import { loadConfig } from './load-config';
import { initUpdater } from './update-tasks';

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
    frame: !isWindows,

    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: false,
      allowRunningInsecureContent: isDebug,
      nativeWindowOpen: true
    }
  });

  win.webContents.setWindowOpenHandler((details) => {
    let featuresObj: any = {};
    const features = !details.features
      ? []
      : details.features.split(',').map(f => f.split('='));

    for (const f of features) {
      featuresObj[f[0]] = f[1];
    }


    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        x: undefined,
        y: undefined,
        width: parseInt(featuresObj.width),
        height: parseInt(featuresObj.height),
        minWidth: parseInt(featuresObj.width),
        center: true,
        webPreferences: {
          sandbox: true,
          contextIsolation: false
        }
      }
    };
  });

  win.webContents.on('did-create-window', (childWindow) => {
    childWindow.removeMenu();
  });

  win.setMenu(null);

  mainWindowState.manage(win);

  win.on('close', async (event) => {
    // TODO fix close to tray
    const config = await loadConfig(win);
    try {
      const closeToTray = JSON.parse(config).monitorConfig.closeToTray;
      if (closeToTray.closeToTray && !isQuitting) {
        event.preventDefault();
        win.hide();
      } else {
        let children = win.getChildWindows();
        for (let child of children) {
          child.close();
        }
      }

    } catch (error) {
      logger.error('[Electron]', '(initUpdater)', 'Error reading config json', error);
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
    initUpdater(logger, win, isDebug);
  }

  initElectronLogger();
  if (isDebug) {

    globalShortcut.register('f5', () => {
      win.reload();
    });

    globalShortcut.register('f6', () => {
      win.loadURL('http://localhost:4200');
    });

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

    const ua = win.webContents.userAgent;
    console.log(ua);

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

  initIpcModule(win);
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
