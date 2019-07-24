"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var logger = require("electron-log");
var electron_updater_1 = require("electron-updater");
var path = require("path");
var url = require("url");
var electron_log_1 = require("./electron-log");
var update_tasks_1 = require("./update-tasks");
var WindowStateKeeper = require("electron-window-state");
var win;
var args = process.argv.slice(1);
var isDebug = args.some(function (val) { return val === '--serve'; });
var isLocal = args.some(function (val) { return val === '--local'; });
// if (isDebug) {
logger.transports.file.level = 'debug';
logger.transports.console.level = 'debug';
// }
electron_updater_1.autoUpdater.logger = logger;
function appReady() {
    logger.debug('[Electron]', '(appReady)', __dirname);
    electron_1.app.setAppUserModelId('com.wowsmonitor.app');
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    var mainWindowState = WindowStateKeeper({
        defaultWidth: size.width,
        defaultHeight: size.height
    });
    win = new electron_1.BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 650,
        frame: false,
        icon: isDebug
            ? path.join(__dirname, '../src/assets/icons/favicon-light.ico')
            : path.join(__dirname, 'dist/app-desktop/assets/icons/favicon-light.ico'),
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindowState.manage(win);
    update_tasks_1.initUpdater(logger, win, isDebug);
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
            slashes: true,
        }));
    }
    win.on('closed', function () {
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