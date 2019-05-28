"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_updater_1 = require("electron-updater");
function initUpdater(logger, win) {
    electron_updater_1.autoUpdater.autoDownload = false;
    electron_updater_1.autoUpdater.autoInstallOnAppQuit = false;
    electron_1.ipcMain.on('checkForUpdate', function (event, args) {
        electron_updater_1.autoUpdater.checkForUpdates();
    });
    electron_1.ipcMain.on('quitAndInstall', function (event, args) {
        electron_updater_1.autoUpdater.quitAndInstall();
    });
    electron_updater_1.autoUpdater.on('checking-for-update', function () {
        win.webContents.send('checking-for-update');
    });
    electron_updater_1.autoUpdater.on('update-available', function (info) {
        win.webContents.send('update-available');
        electron_updater_1.autoUpdater.downloadUpdate();
    });
    electron_updater_1.autoUpdater.on('update-not-available', function (info) {
        win.webContents.send('update-available');
    });
    electron_updater_1.autoUpdater.on('update-error', function (err) {
        win.webContents.send('update-error', err);
    });
    electron_updater_1.autoUpdater.on('download-progress', function (progressObj) {
        win.webContents.send('download-progress', progressObj);
    });
    electron_updater_1.autoUpdater.on('update-downloaded', function (info) {
        win.webContents.send('update-downloaded');
    });
}
exports.initUpdater = initUpdater;
//# sourceMappingURL=update-tasks.js.map