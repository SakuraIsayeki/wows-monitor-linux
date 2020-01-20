"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
var fs = require("fs");
var path = require("path");
function initUpdater(logger, win, isDebug) {
    var allowBeta = true;
    var configPath = isDebug ? path.join(process.env.APPDATA, '@wows-monitor', 'config.json') : 'config.json';
    if (fs.existsSync(configPath)) {
        var config = fs.readFileSync(configPath, { encoding: 'utf-8' });
        // allowBeta = JSON.parse(config).allowBeta;
    }
    electron_updater_1.autoUpdater.autoDownload = false;
    electron_updater_1.autoUpdater.autoInstallOnAppQuit = false;
    electron_updater_1.autoUpdater.channel = allowBeta ? 'beta' : 'release';
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
}
exports.initUpdater = initUpdater;
//# sourceMappingURL=update-tasks.js.map