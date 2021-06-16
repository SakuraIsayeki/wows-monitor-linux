"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var logger = require("electron-log");
var electron_updater_1 = require("electron-updater");
var WindowStateKeeper = require("electron-window-state");
var os = require("os");
var path = require("path");
var url = require("url");
var electron_log_1 = require("./electron-log");
var load_config_1 = require("./load-config");
var update_tasks_1 = require("./update-tasks");
// Initialize remote module
require('@electron/remote/main').initialize();
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
    return __awaiter(this, void 0, void 0, function () {
        var isQuitting, size, mainWindowState, iconExt, iconPath, trayIconPath;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isQuitting = false;
                    logger.debug('[Electron]', '(appReady)', __dirname, isDebug);
                    electron_1.app.setAppUserModelId('com.wowsmonitor.app');
                    size = electron_1.screen.getPrimaryDisplay().workAreaSize;
                    mainWindowState = WindowStateKeeper({
                        defaultWidth: size.width,
                        defaultHeight: size.height
                    });
                    iconExt = isWindows ? 'ico' : 'png';
                    iconPath = isDebug
                        ? path.join(__dirname, "../src/assets/icons/favicon-light." + iconExt)
                        : path.join(__dirname, "../dist/desktop/assets/icons/favicon-light." + iconExt);
                    trayIconPath = isDebug
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
                            enableRemoteModule: true,
                            allowRunningInsecureContent: isDebug
                        }
                    });
                    win.setMenu(null);
                    mainWindowState.manage(win);
                    win.on('close', function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var config;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, load_config_1.loadConfig(win)];
                                case 1:
                                    config = _a.sent();
                                    try {
                                        if (JSON.parse(config).closeToTray && !isQuitting) {
                                            event.preventDefault();
                                            win.hide();
                                        }
                                    }
                                    catch (error) {
                                        logger.error('[Electron]', '(onWinClose)', 'Error when reading config', error);
                                    }
                                    return [2 /*return*/, false];
                            }
                        });
                    }); });
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
                    if (!isWindows) return [3 /*break*/, 2];
                    return [4 /*yield*/, update_tasks_1.initUpdater(logger, win, isDebug)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    electron_log_1.initElectronLogger(logger);
                    if (isDebug) {
                        electron_1.globalShortcut.register('f5', function () {
                            win.reload();
                        });
                        electron_1.globalShortcut.register('f6', function () {
                            win.loadURL('http://localhost:4201');
                        });
                        require('electron-reload')(__dirname, {
                            electron: require(__dirname + "/../node_modules/electron")
                        });
                        win.loadURL('http://localhost:4201');
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
                    return [2 /*return*/];
            }
        });
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