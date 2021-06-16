import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SettingsService } from '@services/settings.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BaseComponent } from '@components/base.component';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html'
})
export class QrComponent extends BaseComponent implements OnInit {


  closeIcon = faTimes;

  get tokenPath() {
    return this.settingsService.form.signalRToken.model ? environment.apiUrl + '/qr/image/' + this.settingsService.form.signalRToken.model + '.png' : null;
  }

  tokenCopyUrl: string;

  constructor(
    private settingsService: SettingsService,
    private ref: DynamicDialogRef
  ) {
    super();

  }

  ngOnInit() {
    this.tokenCopyUrl = `${environment.appUrl}/connect/${this.settingsService.form.signalRToken.model}`;
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
