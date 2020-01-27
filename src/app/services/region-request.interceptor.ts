import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';




@Injectable()
export class RegionRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    if (window.sessionStorage.getItem('x-region')) {
      req = req.clone({
        setHeaders: {
          'x-region': window.sessionStorage.getItem('x-region')
        }
      });
    }

    // Also handle errors globally
    return next.handle(req).pipe(
      tap(x => x, err => {
        // Handle this err
        console.error(`Error performing request, status code = ${err.status}`);
      })
    );
  }
}
