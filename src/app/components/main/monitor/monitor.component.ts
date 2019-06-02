import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { SignalrServiceToken, SignalrService } from 'src/app/interfaces/signalr.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent extends BaseComponent implements OnInit {

  constructor(@Inject(SignalrServiceToken) public signalrService: SignalrService) {
    super();
  }

  ngOnInit() {
  }

}
