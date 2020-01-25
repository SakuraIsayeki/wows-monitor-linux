import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from './region';

export const DirectoryServiceToken = new InjectionToken('directory-service');
export type PathBase = 'CWD' | 'EXE_PATH';

export interface DirectoryService {

  currentStatus: DirectoryStatus;
  /** returns file content */
  $changeDetected: Observable<string>;
  $status: Observable<DirectoryStatus>;

  refresh(): void;
  getResFolderPath(basePath: string, status?: DirectoryStatus): Promise<string>;
}

export interface DirectoryStatus {
  replaysFolders?: string[];
  replaysFoldersFound?: boolean;
  replaysDirPath?: string;
  replaysVersioned?: boolean;
  clientVersion?: string;
  folderVersion?: string;
  replaysPathBase?: PathBase;
  preferencesPathBase?: PathBase;
  steamVersion?: boolean;
  region?: Region;
}
