import { Component, OnDestroy, ViewChild } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseComponent } from '@components/base.component';
import { faQrcode, faWifi } from '@fortawesome/free-solid-svg-icons';
import { SignalrStatus } from '@interfaces/signalr';
import { TranslateService } from '@ngx-translate/core';
import { ResizeService } from '@services/resize.service';
import { SignalrService } from '@services/signalr.service';
import { ShowOnDirective } from '@shared/directives/show-on.directive';
import { DialogService } from 'primeng/dynamicdialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map } from 'rxjs/operators';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { QrComponent } from './qr/qr.component';

marker('service.connected');
marker('service.issues.browser.noToken');
marker('service.hostConnected');
marker('service.issues.browser.hostDisconnected');
marker('service.issues.connection');

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html'
})
export class ConnectionComponent extends BaseComponent implements OnDestroy {

  connectionIcon = faWifi;
  qrIcon = faQrcode;

  @ViewChild('qrErrorDetails', { static: true })
  qrErrorDetails: OverlayPanel;

  statusText = this.signalrService.$gatewayStatus.pipe(map(status => {
    if (status === SignalrStatus.Connected) {
      return 'service.connected';
    } else if (status === SignalrStatus.NoToken) {
      return 'service.issues.browser.noToken';
    } else if (status === SignalrStatus.HostConnected) {
      return 'service.hostConnected';
    } else if (status === SignalrStatus.HostDisconnected) {
      return 'service.issues.browser.hostDisconnected';
    } else if (status === SignalrStatus.Reconnecting) {
      return 'service.reconnecting';
    } else {
      return 'service.issues.connection';
    }
  }));

  showOnTablet = this.resizeService.$resizeListener.pipe(map(() => ShowOnDirective.checkStatic('tablet', false)));

  constructor(
    public signalrService: SignalrService,
    private dialogService: DialogService,
    private resizeService: ResizeService,
    private translateService: TranslateService
  ) {
    super();
  }


  async connect() {
    await this.signalrService.connect();
  }

  async reconnect() {
    await this.connect();
  }

  openQrDialog(event) {
    if (this.isDesktop) {
      this.dialogService.open(QrComponent, {
        styleClass: 'qrPopup custom-popup desktop',
        header: this.translateService.instant('webConnect.desktop.title'),
        dismissableMask: true
      });
    } else {
      this.dialogService.open(QrScanComponent, {
        styleClass: 'qrPopup custom-popup browser',
        showHeader: this.translateService.instant('webConnect.browser.title'),
        dismissableMask: true
      });
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
