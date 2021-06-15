import { Component, Inject, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseComponent } from '@components/base.component';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle, faSync } from '@fortawesome/free-solid-svg-icons';
import { SignalrService, SignalrServiceToken, Status } from '@interfaces/signalr.service';
import { map } from 'rxjs/operators';

marker('service.status.idle');
marker('service.status.fetching');
marker('service.status.fetched');

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent extends BaseComponent implements OnInit {

  syncIcon = faSync;
  checkIcon = faCheckCircle;
  circleIcon = faCircle;

  get statusText() {
    return this.signalRService.$status.pipe(map(status => {
      if (status === Status.Idle) {
        return 'service.status.idle';
      } else if (status === Status.Fetching) {
        return 'service.status.fetching';
      } else {
        return 'service.status.fetched';
      }
    }));
  }

  constructor(
    @Inject(SignalrServiceToken) public signalRService: SignalrService
  ) {
    super();
  }

  ngOnInit() {
  }

}
