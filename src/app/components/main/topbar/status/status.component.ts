import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { SignalrService, SignalrServiceToken, Status } from 'src/app/interfaces/signalr.service';
import { faSync, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent extends BaseComponent implements OnInit {

  public syncIcon = faSync;
  public checkIcon = faCheckCircle;
  public circleIcon = faCircle;

  public get statusText() {
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
