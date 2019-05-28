import { NgModule } from '@angular/core';
import { Config } from 'src/config/config';
import { AppComponent } from './app.component';
import { AppSharedModule } from './app.module.shared';
import { ConfigServiceToken } from './interfaces/config.service';
import { DirectoryServiceToken } from './interfaces/directory.service';
import { LoggerServiceToken } from './interfaces/logger.service';
import { SignalrServiceToken } from './interfaces/signalr.service';
import { UpdateServiceToken } from './interfaces/update.service';
import { CommonSignalrService } from './services/common-signalr.service';
import { ElectronLoggerService } from './services/desktop/electron-logger.service';
import { ElectronUpdateService } from './services/desktop/electron-update.service';
import { ElectronService } from './services/desktop/electron.service';
import { FsConfigService } from './services/desktop/fs-config.service';
import { FsDirectoryService } from './services/desktop/fs-directory.service';


@NgModule({
  declarations: [],
  imports: [
    AppSharedModule
  ],
  providers: [
    { provide: ConfigServiceToken, useClass: FsConfigService },
    { provide: DirectoryServiceToken, useClass: FsDirectoryService },
    { provide: UpdateServiceToken, useClass: ElectronUpdateService, deps: [ElectronService, LoggerServiceToken] },
    { provide: LoggerServiceToken, useClass: ElectronLoggerService },
    { provide: SignalrServiceToken, useClass: CommonSignalrService },
    Config,
    ElectronService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
