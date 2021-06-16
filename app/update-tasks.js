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
exports.initUpdater = void 0;
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var load_config_1 = require("./load-config");
function initUpdater(logger, win, isDebug) {
    return __awaiter(this, void 0, void 0, function () {
        var allowBeta, config;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allowBeta = false;
                    return [4 /*yield*/, load_config_1.loadConfig(win)];
                case 1:
                    config = _a.sent();
                    try {
                        allowBeta = JSON.parse(config).monitorConfig.allowBeta;
                    }
                    catch (error) {
                        logger.error('[Electron]', '(initUpdater)', 'Error reading config json', error);
                    }
                    electron_updater_1.autoUpdater.channel = allowBeta ? 'beta' : 'latest';
                    electron_updater_1.autoUpdater.autoDownload = false;
                    electron_updater_1.autoUpdater.autoInstallOnAppQuit = false;
                    electron_1.ipcMain.on('checkForUpdate', function (event, args) {
                        logger.debug('[Electron]', '(checkForUpdate)');
                        if (isDebug) {
                            win.webContents.send('update-not-available');
                        }
                        else {
                            electron_updater_1.autoUpdater.checkForUpdates();
                        }
                    });
                    electron_1.ipcMain.on('quitAndInstall', function (event, args) {
                        logger.debug('[Electron]', '(quitAndInstall)');
                        electron_updater_1.autoUpdater.downloadUpdate();
                    });
                    electron_updater_1.autoUpdater.on('checking-for-update', function () {
                        logger.debug('[Electron]', '(checking-for-update)');
                        win.webContents.send('checking-for-update');
                    });
                    electron_updater_1.autoUpdater.on('update-available', function (info) {
                        logger.debug('[Electron]', '(update-available)');
                        win.webContents.send('update-available');
                    });
                    electron_updater_1.autoUpdater.on('update-not-available', function (info) {
                        logger.debug('[Electron]', '(update-not-available)');
                        win.webContents.send('update-not-available');
                    });
                    electron_updater_1.autoUpdater.on('update-error', function (err) {
                        logger.debug('[Electron]', '(update-error)');
                        win.webContents.send('update-error', err);
                    });
                    electron_updater_1.autoUpdater.on('download-progress', function (progressObj) {
                        logger.debug('[Electron]', '(download-progress)');
                        win.webContents.send('download-progress', progressObj);
                    });
                    electron_updater_1.autoUpdater.on('update-downloaded', function (info) {
                        logger.debug('[Electron]', '(update-downloaded)');
                        win.webContents.send('update-downloaded');
                        electron_updater_1.autoUpdater.quitAndInstall();
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.initUpdater = initUpdater;
//# sourceMappingURL=update-tasks.js.map