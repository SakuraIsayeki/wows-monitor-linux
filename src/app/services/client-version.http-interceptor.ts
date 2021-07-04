import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { staticValues } from '@environments/static-values';
import { Observable } from 'rxjs';

@Injectable()
export class ClientVersionHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ setHeaders: { 'x-client-version': staticValues.version } }));
  }

}
