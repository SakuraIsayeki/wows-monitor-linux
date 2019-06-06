import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { LoggerServiceToken, LoggerService } from 'src/app/interfaces/logger.service';
import { faWifi, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DialogService } from 'primeng/api';
import { QrComponent } from './qr/qr.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { take, map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ShowOnDirective } from 'src/app/shared/directives/show-on.directive';
import { ResizeService } from 'src/app/services/resize.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html'
})
export class ConnectionComponent extends BaseComponent implements AfterViewInit {

  showOn = new ShowOnDirective(null, null, this.resizeService);

  connectionIcon = faWifi;
  qrIcon = faQrcode;

  @ViewChild('qrErrorDetails', { static: true })
  qrErrorDetails: OverlayPanel;

  statusText = this.signalrService.$socketStatus.pipe(map(status => {
    if (status === SignalrStatus.Connected) {
      return 'service.connected';
    } else if (status === SignalrStatus.NoToken) {
      return 'service.issues.browser.noToken';
    } else {
      if (this.isBrowser) {
        return 'service.issues.browser.noConnection';
      } else {
        return 'service.issues.desktop';
      }
    }
  }));

  showOnTablet = this.resizeService.$resizeListener.pipe(map(() => this.showOn.checkStatic('tablet', false)));

  constructor(
    @Inject(SignalrServiceToken) public signalrService: SignalrService,
    private dialogService: DialogService,
    private resizeService: ResizeService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.signalrService.init().then(() => {
      this.connect();
    });
  }

  async connect() {
    return await this.signalrService.connect();
  }

  async reconnect() {
    await this.connect();
  }

  openQrDialog(event) {
    this.signalrService.$socketStatus.pipe(take(1)).subscribe(status => {
      if (this.isDesktop && status !== SignalrStatus.Connected) {
        this.qrErrorDetails.show(event);
        return;
      }
      if (this.isDesktop) {
        this.dialogService.open(QrComponent, { styleClass: 'qrPopup desktop', showHeader: false, dismissableMask: true });
      } else {
        this.dialogService.open(QrScanComponent, { styleClass: 'qrPopup browser', showHeader: false, dismissableMask: true });
      }
    });
  }
}
