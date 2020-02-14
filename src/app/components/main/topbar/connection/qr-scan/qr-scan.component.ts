import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/components/base.component';
import { SignalrService, SignalrServiceToken } from 'src/app/interfaces/signalr.service';
import { Config } from 'src/config/config';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html'
})
export class QrScanComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  closeIcon = faTimes;

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  @ViewChild('videoTag', { static: false })
  videoTag: ElementRef<HTMLVideoElement>;

  hasCameras = false;
  hasPermission = true;
  enabled = false;
  qrResultString: string;

  devices: SelectItem[] = [];
  selectedDevice: MediaDeviceInfo = null;

  constructor(
    public ref: DynamicDialogRef,
    private config: Config,
    @Inject(SignalrServiceToken) private signalrService: SignalrService
  ) {
    super();

  }

  async ngAfterViewInit() {
    this.ref.onClose.pipe(this.untilDestroy()).subscribe(() => {
      this.selectedDevice = null;
      this.enabled = false;
    });

    this.hasPermission = await this.scanner.askForPermission();
    let devices = await this.scanner.updateVideoInputDevices();
    devices = devices.filter(d => d.kind === 'videoinput');

    this.devices = [];
    devices.forEach((device, index) => {
      this.devices.push({
        label: device.label || 'Camera ' + index + 1,
        value: device
      });
    });

    // for (const device of devices) {
    //   if (/back|rear|environment/gi.test(device.label)) {
    //     this.selectedDevice = device;
    //     break;
    //   }
    // }

    if (this.devices && this.devices.length > 0) {
      this.selectedDevice = this.devices[0].value;
      this.enabled = true;
    }
  }

  handleQrCodeResult(resultString: string) {
    this.analyticsService.send('scanQrCode', 'browserEvents', 'scanQrCode', resultString);
    this.config.signalRToken = resultString;
    this.config.save();
    this.ref.close();
    this.signalrService.sendSettings({ token: this.config.signalRToken });
  }

  close() {
    this.ref.close();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
}
