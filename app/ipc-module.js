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
exports.initIpcModule = void 0;
var electron_1 = require("electron");
var logger = require("electron-log");
var fs = require("fs/promises");
function initIpcModule(win) {
    var _this = this;
    electron_1.ipcMain.handle('restart', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            electron_1.app.relaunch();
            electron_1.app.exit();
            return [2 /*return*/];
        });
    }); });
    electron_1.ipcMain.handle('take-screenshot', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.debug('[Electron]', '(take-screenshot)');
                    return [4 /*yield*/, takeScreenshot(win, args)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    electron_1.ipcMain.handle('open-file-dialog', function (event, args) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog(win, args)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    }); });
    electron_1.ipcMain.handle('get-window-and-screen-info', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var window, windowSize, windowBounds, display;
        return __generator(this, function (_a) {
            window = electron_1.BrowserWindow.getAllWindows()[0];
            windowSize = window.getSize();
            windowBounds = window.getBounds();
            display = electron_1.screen.getDisplayNearestPoint({ x: windowBounds.x, y: windowBounds.y });
            return [2 /*return*/, {
                    sizeX: windowSize[0],
                    sizeY: windowSize[1],
                    displayWidth: display.size.width,
                    displayHeight: display.size.height
                }];
        });
    }); });
    initWindowFunction(win);
}
exports.initIpcModule = initIpcModule;
function takeScreenshot(win, args) {
    return __awaiter(this, void 0, void 0, function () {
        var result, path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, win.webContents.capturePage({
                        x: 0,
                        y: 84,
                        width: 1920,
                        height: 1006
                    })];
                case 1:
                    result = _a.sent();
                    if (!args.path) return [3 /*break*/, 3];
                    path = args.path + '/' + args.filename;
                    return [4 /*yield*/, fs.writeFile(path, result.toPNG())];
                case 2:
                    _a.sent();
                    logger.debug('[Electron]', '(save-screenshot)', path);
                    return [3 /*break*/, 4];
                case 3:
                    electron_1.clipboard.writeImage(result, 'selection');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function initWindowFunction(win) {
    var _this = this;
    electron_1.ipcMain.handle('get-win-state', function () { return __awaiter(_this, void 0, void 0, function () {
        var state;
        return __generator(this, function (_a) {
            state = {
                maximizable: win.maximizable,
                isMaximized: win.isMaximized(),
                minimizable: win.minimizable,
                closable: win.closable
            };
            return [2 /*return*/, state];
        });
    }); });
    electron_1.ipcMain.handle('minimize-win', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, win.minimize()];
    }); }); });
    electron_1.ipcMain.handle('maximize-win', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, win.maximize()];
    }); }); });
    electron_1.ipcMain.handle('restore-win', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, win.restore()];
    }); }); });
    electron_1.ipcMain.handle('close-win', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, win.close()];
    }); }); });
    win
        .on('show', function () { return win.webContents.send('win-show'); })
        .on('maximize', function () { return win.webContents.send('win-maximize'); })
        .on('unmaximize', function () { return win.webContents.send('win-unmaximize'); })
        .on('minimize', function () { return win.webContents.send('win-minimize'); })
        .on('restore', function () { return win.webContents.send('win-restore'); })
        .on('resized', function () { return win.webContents.send('win-resized'); })
        .on('move', function () { return win.webContents.send('win-move'); });
}
//# sourceMappingURL=ipc-module.js.map