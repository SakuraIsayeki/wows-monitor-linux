import { app, BrowserWindow, globalShortcut, Menu, Tray } from 'electron';
import * as logger from 'electron-log';
import { autoUpdater } from 'electron-updater';
import * as os from 'os';
import * as path from 'path';
import * as url from 'url';
import { initElectronLogger } from './electron-log';
import { initIpcModule } from './ipc-module';
import { loadConfig } from './load-config';
import { initUpdater } from './update-tasks';
import { WindowStateManager } from './window-state';

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
} else {
  logger.transports.file.level = 'warn';
}

autoUpdater.logger = logger;

async function appReady() {
  let isQuitting = false;

  logger.debug('[Electron]', '(appReady)', __dirname, isDebug);

  app.setAppUserModelId('com.wowsmonitor.app');

  if (isDebug) {
    app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
      event.preventDefault();
      callback(true);
    });
  }

  const windowStateManager = new WindowStateManager();
  await windowStateManager.init(app);

  // const size = screen.getPrimaryDisplay().workAreaSize;
  // const mainWindowState = WindowStateKeeper({
  //   defaultWidth: size.width,
  //   defaultHeight: size.height
  // });

  const iconExt = isWindows ? 'ico' : 'png';

  const iconPath = isDebug
    ? path.join(__dirname, `../src/assets/icons/favicon-light.${iconExt}`)
    : path.join(__dirname, `../dist/desktop/assets/icons/favicon-light.${iconExt}`);

  const trayIconPath = isDebug
    ? path.join(__dirname, `../src/assets/icons/favicon-light.${iconExt}`)
    : path.join(__dirname, `../favicon-tray.${iconExt}`);

  const state = windowStateManager.state;

  win = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
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

  // mainWindowState.manage(win);

  win.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      closeApp(win).then(() => {
      }).catch(err => {
      });

    }
    return false;
  });

  async function closeApp(win: BrowserWindow) {
    const config = await loadConfig(win);

    try {
      const closeToTray = JSON.parse(config).monitorConfig.closeToTray;
      if (closeToTray && !isQuitting) {
        win.hide();
      } else {
        isQuitting = true;
        let children = win.getChildWindows();
        for (let child of children) {
          child.close();
        }
        await windowStateManager.saveState(win);
        win.close();
      }
    } catch (error) {
      logger.error('[Electron]', '(windowClose)', 'Error reading config json', error);
    }
  }


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
  app.on('ready', () => {

    appReady().then(() => console.log('READY')).catch(x => console.warn(x));
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', async () => {
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
