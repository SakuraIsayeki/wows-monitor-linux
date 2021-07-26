import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtAuthService } from '@services/jwt-auth.service';
import { SettingsService } from '@services/settings.service';
import { AUTHSERVICETOKEN, LocatorService } from '@stewie/framework';
import { Observable } from 'rxjs';

declare var ga: any;

@Injectable()
export class ClientIdHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('identity'))
      return next.handle(req);
    const authService = LocatorService.Injector.get(AUTHSERVICETOKEN) as JwtAuthService;
    const settings = LocatorService.Injector.get(SettingsService) as SettingsService;

    const uuid = authService?.userInfo?.uuid ?? settings?.form?.uuid?.value;
    if (uuid) {
      req = req.clone({ setHeaders: { 'x-ga-clientId': uuid } });
    }

    return next.handle(req);
  }

}
