import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/base.component';
import { DynamicDialogRef } from 'primeng/api';
import { environment } from 'src/environments/environment.browser';
import { Config } from 'src/config/config';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html'
})
export class QrComponent extends BaseComponent implements OnInit {


  closeIcon = faTimes;

  get tokenPath() {
    return this.config.signalRToken ? environment.apiUrl + '/qr/image/' + this.config.signalRToken + '.png' : null;
  }

  constructor(
    private config: Config,
    private ref: DynamicDialogRef
  ) {
    super();

  }

  ngOnInit() {
  }

  close() {
    this.ref.close();
  }
}
