import { App, BrowserWindow, screen } from 'electron';
import * as logger from 'electron-log';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  maximized: boolean;
}

export class WindowStateManager {

  private path: string;
  private _state: WindowState;

  public get state() {
    return this._state;
  }

  constructor() {
  }

  public async init(app: App) {
    this.path = join(app.getPath('userData'), 'windowstate.json');
    try {
      const file = await readFile(this.path, 'utf-8');
      this._state = JSON.parse(file) as WindowState;
      const s = 1;
    } catch (error) {
      logger.error('Error when reading window state', error);
      const display = screen.getPrimaryDisplay();
      this._state = {
        x: display.bounds.x,
        y: display.bounds.y,
        width: display.bounds.width,
        height: display.bounds.height,
        maximized: true
      };
    }
  }

  async saveState(window: BrowserWindow) {
    const [x, y] = window.getPosition();
    const [width, height] = window.getSize();
    const maximized = window.isMaximized();
    const state: WindowState = { x, y, width, height, maximized };

    logger.debug('Logging WindowState', JSON.stringify(state));
    await writeFile(this.path, JSON.stringify(state), { encoding: 'utf-8', flag: 'w' });

  }
}
