import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '@services/settings.service';
import { BaseComponent } from '../base.component';

@Component({
  template: ''
})
export class ConnectComponent extends BaseComponent implements OnInit {

  constructor(private settingsService: SettingsService, private route: ActivatedRoute) {
    super();
  }

  async ngOnInit() {
    await this.settingsService.waitForInitialized();
    this.settingsService.form.signalRToken.setValue(this.route.snapshot.params.token);
    await this.router.navigateByUrl('/');
  }
}
