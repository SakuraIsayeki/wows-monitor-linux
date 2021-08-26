"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var logger = require("electron-log");
var electron_updater_1 = require("electron-updater");
var WindowStateKeeper = require("electron-window-state");
var os = require("os");
var path = require("path");
var url = require("url");
var electron_log_1 = require("./electron-log");
var ipc_module_1 = require("./ipc-module");
var load_config_1 = require("./load-config");
var update_tasks_1 = require("./update-tasks");
var isWindows = os.platform() === 'win32';
var win;
var tray;
var contextMenu;
var args = process.argv.slice(1);
var isDebug = args.some(function (val) { return val === '--serve'; });
// const isLocal = args.some(val => val === '--local');
if (isDebug) {
    logger.transports.file.level = 'debug';
    logger.transports.console.level = 'debug';
}
electron_updater_1.autoUpdater.logger = logger;
function appReady() {
    var isQuitting = false;
    logger.debug('[Electron]', '(appReady)', __dirname, isDebug);
    electron_1.app.setAppUserModelId('com.wowsmonitor.app');
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    var mainWindowState = WindowStateKeeper({
        defaultWidth: size.width,
        defaultHeight: size.height
    });
    var iconExt = isWindows ? 'ico' : 'png';
    var iconPath = isDebug
        ? path.join(__dirname, "../src/assets/icons/favicon-light." + iconExt)
        : path.join(__dirname, "../dist/desktop/assets/icons/favicon-light." + iconExt);
    var trayIconPath = isDebug
        ? path.join(__dirname, "../src/assets/icons/favicon-light." + iconExt)
        : path.join(__dirname, "../favicon-tray." + iconExt);
    win = new electron_1.BrowserWindow({
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
    win.webContents.setWindowOpenHandler(function (details) {
        var featuresObj = {};
        var features = !details.features
            ? []
            : details.features.split(',').map(function (f) { return f.split('='); });
        for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
            var f = features_1[_i];
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
    win.webContents.on('did-create-window', function (childWindow) {
        childWindow.removeMenu();
    });
    win.setMenu(null);
    mainWindowState.manage(win);
    win.on('close', function (event) {
        if (!isQuitting) {
            event.preventDefault();
            load_config_1.loadConfig(win).then(function (config) {
                try {
                    var closeToTray = JSON.parse(config).monitorConfig.closeToTray;
                    if (closeToTray && !isQuitting) {
                        win.hide();
                    }
                    else {
                        isQuitting = true;
                        var children = win.getChildWindows();
                        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                            var child = children_1[_i];
                            child.close();
                        }
                        win.close();
                    }
                }
                catch (error) {
                    logger.error('[Electron]', '(windowClose)', 'Error reading config json', error);
                }
            }).catch(function (err) { return logger.error('[Electron]', '(windowClose)', err); });
        }
        return false;
    });
    tray = new electron_1.Tray(trayIconPath);
    contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Open',
            click: function () {
                win.show();
            }
        },
        {
            label: 'Close',
            click: function () {
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
        update_tasks_1.initUpdater(logger, win, isDebug);
    }
    electron_log_1.initElectronLogger();
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
        logger.error(path.join(__dirname, '../dist/desktop/index.html'));
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../dist/desktop/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.on('closed', function () {
        tray.destroy();
        contextMenu = null;
        win = null;
    });
    ipc_module_1.initIpcModule(win);
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