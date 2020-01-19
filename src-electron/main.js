"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var logger = require("electron-log");
var electron_updater_1 = require("electron-updater");
var WindowStateKeeper = require("electron-window-state");
var fs = require("fs");
var path = require("path");
var url = require("url");
var electron_log_1 = require("./electron-log");
var update_tasks_1 = require("./update-tasks");
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
    var iconPath = isDebug
        ? path.join(__dirname, '../src/assets/icons/favicon-light.ico')
        : path.join(__dirname, 'dist/app-desktop/assets/icons/favicon-light.ico');
    win = new electron_1.BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 650,
        frame: false,
        icon: iconPath,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindowState.manage(win);
    win.on('close', function (event) {
        var configPath = !isDebug ? path.join(process.env.APPDATA, '@wows-monitor', 'config.json') : 'config.json';
        var config = fs.readFileSync(configPath, { encoding: 'utf-8' });
        if (JSON.parse(config).closeToTray && !isQuitting) {
            event.preventDefault();
            win.hide();
        }
        return false;
    });
    tray = new electron_1.Tray(electron_1.nativeImage.createFromPath(iconPath));
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
    tray.setContextMenu(contextMenu);
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