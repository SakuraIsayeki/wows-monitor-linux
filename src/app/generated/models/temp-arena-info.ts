/* tslint:disable */
import { MatchGroup } from './match-group';
import { Vehicle } from './vehicle';
export interface TempArenaInfo {
  clientVersionFromExe?: null | string;
  clientVersionFromXml?: null | string;
  dateTime?: null | string;
  duration?: number;
  gameLogic?: null | string;
  gameMode?: number;
  logic?: null | string;
  mapDisplayName?: null | string;
  mapId?: number;
  mapName?: null | string;
  matchGroup?: MatchGroup;
  name?: null | string;
  playerID?: number;
  playerName?: null | string;
  playerVehicle?: null | string;
  playersPerTeam?: number;
  scenario?: null | string;
  scenarioConfigId?: number;
  teamsCount?: number;
  useMatchGroup?: MatchGroup;
  vehicles?: null | Array<Vehicle>;
}
