import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SignalrServiceToken, SignalrService } from 'src/app/interfaces/signalr.service';
import { Config } from 'src/config/config';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnInit {

  get $fontSizeClass() {
    return this.config.$fontsize.pipe(map(fz => 'fz-' + fz));
  }

  constructor(
    @Inject(SignalrServiceToken) public signalrService: SignalrService,
    private config: Config
  ) {
    super();
  }

  ngOnInit() {
  }

}
