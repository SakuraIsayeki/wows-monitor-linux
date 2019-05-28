"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function initElectronLogger(logger) {
    electron_1.ipcMain.on('log-debug', function (event, args) {
        logger.debug.apply(logger, ['[Angular Debug]'].concat(args));
    });
    electron_1.ipcMain.on('log-error', function (event, args) {
        logger.error.apply(logger, ['[Angular Error]'].concat(args));
    });
}
exports.initElectronLogger = initElectronLogger;
//# sourceMappingURL=electron-log.js.map