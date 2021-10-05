import { Component, HostBinding, OnDestroy } from '@angular/core';
import { BaseComponent } from '@components/base.component';
import { faPaintBrush, faQrcode, faWifi } from '@fortawesome/free-solid-svg-icons';
import { GatewayService } from '@services/gateway.service';
import { TopbarTitleService } from '@services/topbar-title.service';

@Component({
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnDestroy {

  @HostBinding('class.monitor')
  public classMonitor = true;

  faWifi = faWifi;
  faQr = faQrcode;
  faPaintBrush = faPaintBrush;


  constructor(
    public signalrService: GatewayService,
    private topbarTitleService: TopbarTitleService
  ) {
    super();

    signalrService.info$.pipe(this.untilDestroy()).subscribe(match => this.topbarTitleService.setMatch(match));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.topbarTitleService.setMatch(null);
  }
}
