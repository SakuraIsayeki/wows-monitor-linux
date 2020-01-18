export interface ConfigtoolConfig {
  clientPaths?: string[];
  maxFrameRate?: number;
  cacheEffectsEnabled?: boolean;
  cacheEffects?: boolean;
  streamCacheSizeKBEnabled?: boolean;
  streamCacheSizeKB?: number;
  maxReplaysToSaveEnabled?: boolean;
  maxReplaysToSave?: number;
  versionedReplaysEnabled?: boolean;
  versionedReplays?: boolean;
}

export const defaultConfigtoolConfig: ConfigtoolConfig = {
  clientPaths: [],
  maxFrameRate: 75,
  cacheEffectsEnabled: false,
  cacheEffects: false,
  streamCacheSizeKBEnabled: false,
  streamCacheSizeKB: 2048,
  maxReplaysToSaveEnabled: false,
  maxReplaysToSave: 30,
  versionedReplaysEnabled: false,
  versionedReplays: false,
}
