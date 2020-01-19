import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SignalrServiceToken, SignalrService } from 'src/app/interfaces/signalr.service';
import { Config } from 'src/config/config';
import { map, filter } from 'rxjs/operators';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnInit {

  faWifi = faWifi;

  get $fontSizeClass() {
    return this.config.$fontsize.pipe(map(fz => 'fz-' + fz));
  }

  constructor(
    @Inject(SignalrServiceToken) public signalrService: SignalrService,
    public config: Config
  ) {
    super();
  }

  ngOnInit() {
    this.signalrService.$info.pipe(this.untilDestroy(), filter(i => i != null)).subscribe(() => {
      this.uiSuccess('matchUpdated');
    });
  }
}
