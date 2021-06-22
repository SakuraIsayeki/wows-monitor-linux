/* tslint:disable */
/* eslint-disable */
import { FontSize } from './font-size';
import { LayoutMode } from './layout-mode';
import { PlayerBackgrounds } from './player-backgrounds';
import { PlayerBackgroundsMode } from './player-backgrounds-mode';
import { StatType } from './stat-type';
import { TeamWinrate } from './team-winrate';
export interface MonitorConfig {
  allowBeta?: null | boolean;
  anonymIp?: null | boolean;
  anonymScreenshot?: null | boolean;
  autoUpdate?: null | boolean;
  closeToTray?: null | boolean;
  coloredValues?: null | boolean;
  enableAnalytics?: null | boolean;
  fontSize?: null | FontSize;
  highContrastMode?: null | boolean;
  layoutMode?: null | LayoutMode;
  overwriteReplaysDirectory?: null | string;
  playerBackgrounds?: null | PlayerBackgrounds;
  playerBackgroundsMode?: null | PlayerBackgroundsMode;
  screenshotPath?: null | string;
  showWowsKarma?: null | boolean;
  soloStats?: null | Array<StatType>;
  teamWinrate?: null | TeamWinrate;
}

