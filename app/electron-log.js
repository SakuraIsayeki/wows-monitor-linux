"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initElectronLogger = void 0;
var electron_1 = require("electron");
function initElectronLogger(logger) {
    electron_1.ipcMain.on('log-debug', function (event, args) {
        logger.debug.apply(logger, __spreadArray(['[Angular Debug]'], args));
    });
    electron_1.ipcMain.on('log-warn', function (event, args) {
        logger.warn.apply(logger, __spreadArray(['[Angular Warn]'], args));
    });
    electron_1.ipcMain.on('log-error', function (event, args) {
        logger.error.apply(logger, __spreadArray(['[Angular Error]'], args));
    });
}
exports.initElectronLogger = initElectronLogger;
//# sourceMappingURL=electron-log.js.map