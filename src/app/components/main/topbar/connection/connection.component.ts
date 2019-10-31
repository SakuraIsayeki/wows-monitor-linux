import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { faQrcode, faWifi } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { map, take, pairwise } from 'rxjs/operators';
import { BaseComponent } from 'src/app/components/base.component';
import { SignalrService, SignalrServiceToken, SignalrStatus } from 'src/app/interfaces/signalr.service';
import { ResizeService } from 'src/app/services/resize.service';
import { ShowOnDirective } from 'src/app/shared/directives/show-on.directive';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { QrComponent } from './qr/qr.component';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html'
})
export class ConnectionComponent extends BaseComponent implements AfterViewInit, OnDestroy {

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
      if (status === SignalrStatus.Disconnected) {
        this.uiError('serviceDisconnected');
      } else if (status === SignalrStatus.HostDisconnected) {
        this.uiError('hostDisconnected');
      }
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
    this.signalrService.init().then(() => this.connect());

    this.signalrService.$error.pipe(this.untilDestroy()).subscribe(error => this.uiError('serviceError'));

    if (this.isDesktop) {
      this.signalrService.$clients.pipe(this.untilDestroy(), pairwise()).subscribe(nums => {
        if (nums[0] < nums[1]) {
          this.uiSuccess('clientConnected');
        } else {
          this.uiWarn('clientDisconnected');
        }
      });
    }
  }

  async connect() {
    const result = await this.signalrService.connect();
    if (result) {
      this.uiSuccess('serviceConnected');
    } else {
      this.uiError('noServiceConnection');
    }
    return result;
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
        this.dialogService.open(QrComponent, { styleClass: 'qrPopup custopm-popup desktop', showHeader: false, dismissableMask: true });
      } else {
        this.dialogService.open(QrScanComponent, { styleClass: 'qrPopup custopm-popup browser', showHeader: false, dismissableMask: true });
      }
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
