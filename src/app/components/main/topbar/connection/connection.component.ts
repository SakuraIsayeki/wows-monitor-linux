import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { LoggerServiceToken, LoggerService } from 'src/app/interfaces/logger.service';
import { faWifi, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { OverlayPanel } from 'primeng/overlaypanel';
import { DialogService } from 'primeng/api';
import { QrComponent } from './qr/qr.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { take } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html'
})
export class ConnectionComponent extends BaseComponent implements AfterViewInit {

  public connectionIcon = faWifi;
  public qrIcon = faQrcode;

  @ViewChild('statusDetails')
  public statusDetails: OverlayPanel;

  @ViewChild('qrErrorDetails')
  public qrErrorDetails: OverlayPanel;

  public connecting = false;
  public get iconClasses() {
    return this.connecting ? 'pi pi-replay pi-spin' : 'pi pi-replay';
  }

  constructor(
    @Inject(SignalrServiceToken) public signalrService: SignalrService,
    private dialogService: DialogService
  ) {
    super();
  }

  ngAfterViewInit() {
    this.signalrService.init().then(() => {
      this.connect();
    });
  }

  public async connect() {
    return await this.signalrService.connect();
  }

  public async reconnect() {
    this.connecting = true;
    await this.connect();
    this.connecting = false;
    this.statusDetails.hide();
  }

  public openStatusDetails(event) {
    this.statusDetails.show(event);
    interval(5000).pipe(this.untilDestroy()).subscribe(() => {
      this.statusDetails.hide();
    });
  }

  public openQrDialog(event) {
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
