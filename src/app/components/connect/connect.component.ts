import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayTokenService } from '@services/gateway-token.service';
import { BaseComponent } from '../base.component';

@Component({
  template: ''
})
export class ConnectComponent extends BaseComponent implements OnInit {

  constructor(private gatewayToken: GatewayTokenService,
              private route: ActivatedRoute) {
    super();
  }

  async ngOnInit() {
    this.gatewayToken.setToken(this.route.snapshot.params.token);
    await this.router.navigateByUrl('/');
  }
}
