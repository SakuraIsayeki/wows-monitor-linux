"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
function loadConfig(win) {
    return new Promise(function (resolve, reject) {
        win.webContents
            .executeJavaScript('localStorage.getItem("config")', true)
            .then(function (result) {
            resolve(result);
        }).catch(function (r) { return reject(r); });
    });
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=load-config.js.map