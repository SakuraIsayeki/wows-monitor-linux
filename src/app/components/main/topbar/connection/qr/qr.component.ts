import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseComponent } from '@components/base.component';
import { Config } from '@config/config';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html'
})
export class QrComponent extends BaseComponent implements OnInit {


  closeIcon = faTimes;

  get tokenPath() {
    return this.config.signalRToken ? environment.apiUrl + '/qr/image/' + this.config.signalRToken + '.png' : null;
  }

  tokenCopyUrl: string;

  constructor(
    private config: Config,
    private ref: DynamicDialogRef
  ) {
    super();

  }

  ngOnInit() {
    this.tokenCopyUrl = `${environment.appUrl}/connect/${this.config.signalRToken}`;
  }

  copy(inputText: HTMLInputElement) {
    inputText.select();
    inputText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  close() {
    this.ref.close();
  }
}
