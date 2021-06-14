import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '@config/config';
import { BaseComponent } from '../base.component';

@Component({
  template: ''
})
export class ConnectComponent extends BaseComponent implements OnInit {

  constructor(private config: Config, private route: ActivatedRoute) {
    super();
  }

  async ngOnInit() {
    await this.config.waitTillLoaded();
    this.config.signalRToken = this.route.snapshot.params.token;
    await this.config.save();
    this.router.navigateByUrl('/');
  }
}
