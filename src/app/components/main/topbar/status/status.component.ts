import { Component, Inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { SignalrService, SignalrServiceToken } from 'src/app/interfaces/signalr.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent extends BaseComponent implements OnInit {

  constructor(
    @Inject(SignalrServiceToken) public signalRService: SignalrService
  ) {
    super();
  }

  ngOnInit() {
  }

}
