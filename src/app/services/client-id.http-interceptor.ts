import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

declare var ga: any;

@Injectable()
export class ClientIdHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var tracker = ga.getAll();
    if (tracker && tracker.length > 0) {
      req.headers.set('x-ga-clientId', tracker[0].get('clientId'));
    }
    return next.handle(req);
  }

}