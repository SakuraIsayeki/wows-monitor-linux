"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var logger = require("electron-log");
var electron_updater_1 = require("electron-updater");
var WindowStateKeeper = require("electron-window-state");
var fs = require("fs");
var os = require("os");
var path = require("path");
var url = require("url");
var electron_log_1 = require("./electron-log");
var update_tasks_1 = require("./update-tasks");
var isWindows = os.platform() === 'win32';
var win;
var tray;
var contextMenu;
var args = process.argv.slice(1);
var isDebug = args.some(function (val) { return val === '--serve'; });
var isLocal = args.some(function (val) { return val === '--local'; });
if (isDebug) {
    logger.transports.file.level = 'debug';
    logger.transports.console.level = 'debug';
}
electron_updater_1.autoUpdater.logger = logger;
function appReady() {
    var isQuitting = false;
    logger.debug('[Electron]', '(appReady)', __dirname);
    electron_1.app.setAppUserModelId('com.wowsmonitor.app');
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    var mainWindowState = WindowStateKeeper({
        defaultWidth: size.width,
        defaultHeight: size.height
    });
    var iconExt = isWindows ? 'ico' : 'png';
    var iconPath = isDebug
        ? path.join(__dirname, "../src/assets/icons/favicon-light." + iconExt)
        : path.join(__dirname, "dist/app-desktop/assets/icons/favicon-light." + iconExt);
    var trayIconPath = isDebug
        ? path.join(__dirname, "../src/assets/icons/favicon-light." + iconExt)
        : path.join(__dirname, "../../favicon-tray." + iconExt);
    win = new electron_1.BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 650,
        frame: isWindows ? false : true,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.setMenu(null);
    mainWindowState.manage(win);
    var configBasePath = isWindows
        ? path.join(process.env.APPDATA, '@wows-monitor')
        : path.join(process.env.HOME, '.config', '@wows-monitor');
    var configPath = !isDebug ? path.join(configBasePath, 'config.json') : 'config.json';
    win.on('close', function (event) {
        var config = fs.readFileSync(configPath, { encoding: 'utf-8' });
        try {
            if (JSON.parse(config).closeToTray && !isQuitting) {
                event.preventDefault();
                win.hide();
            }
        }
        catch (error) {
            logger.error('[Electron]', '(onWinClose)', 'Error when reading config', error);
        }
        return false;
    });
    tray = new electron_1.Tray(trayIconPath);
    contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Open', click: function () {
                win.show();
            }
        },
        {
            label: 'Close', click: function () {
                isQuitting = true;
                electron_1.app.quit();
            }
        }
    ]);
    tray.addListener('click', function () {
        win.show();
    });
    tray.setContextMenu(contextMenu);
    if (isWindows) {
        update_tasks_1.initUpdater(logger, win, isDebug, configPath);
    }
    electron_log_1.initElectronLogger(logger);
    if (isDebug) {
        electron_1.globalShortcut.register('f5', function () {
            win.reload();
        });
        electron_1.globalShortcut.register('f6', function () {
            win.loadURL('http://localhost:4200');
        });
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/../node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
        win.webContents.openDevTools();
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, isLocal ? '../dist/app-desktop/index.html' : '../dist/app-desktop/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.on('closed', function () {
        tray.destroy();
        contextMenu = null;
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', appReady);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            appReady();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map