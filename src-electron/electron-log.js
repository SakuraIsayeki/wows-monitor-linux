"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var vi = require('win-version-info');
function initElectronLogger(logger) {
    electron_1.ipcMain.on('log-debug', function (event, args) {
        logger.debug.apply(logger, __spreadArrays(['[Angular Debug]'], args));
    });
    electron_1.ipcMain.on('log-warn', function (event, args) {
        logger.warn.apply(logger, __spreadArrays(['[Angular Warn]'], args));
    });
    electron_1.ipcMain.on('log-error', function (event, args) {
        logger.error.apply(logger, __spreadArrays(['[Angular Error]'], args));
    });
    electron_1.ipcMain.on('get-file-verion', function (event, args) {
        try {
            event.returnValue = vi(args);
        }
        catch (e) {
            logger.error('[Electron Error]', 'get-file-version failed', e);
            event.returnValue = null;
        }
    });
}
exports.initElectronLogger = initElectronLogger;
//# sourceMappingURL=electron-log.js.map