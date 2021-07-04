import { Inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { WebConnectService } from '@generated/services/web-connect.service';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN } from '@stewie/framework';
import { Subject } from 'rxjs';

@Injectable()
export class GatewayTokenService {

  private _tokenChanged$ = new Subject<string>();
  tokenChanged$ = this._tokenChanged$.asObservable();

  constructor(private webConnect: WebConnectService,
              private settings: SettingsService,
              @Inject(AUTHSERVICETOKEN) private authService: JwtAuthService) {
    // this.authService.isAuthenticated$.subscribe(() => {
    //   this.settings.form.signalRToken.setValue(null);
    // });
  }

  async getToken() {
    await this.settings.waitForInitialized();
    let token = this.settings.form.signalRToken.model;

    if (!token || (environment.desktop && this.authService.isAuthenticated) || (environment.browser && this.authService.isAuthenticated && !token)) {
      token = await this.webConnect.webConnectToken().toPromise();
      if (this.settings.form.signalRToken.model != token) {
        this.settings.form.signalRToken.setValue(token);
      }
    }

    return token;
  }

  setToken(token: string) {
    this.settings.form.signalRToken.setValue(token);
    this._tokenChanged$.next(token);
  }
}
