import { BrowserWindow } from 'electron';

export function loadConfig(win: BrowserWindow): Promise<string> {
  return new Promise((resolve, reject) => {
    win.webContents
      .executeJavaScript('localStorage.getItem("config")', true)
      .then(result => {
        resolve(result as string);
      }).catch(r => reject(r));
  });

}
