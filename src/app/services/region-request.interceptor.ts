import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';




@Injectable()
export class RegionRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    if (ApiService.lastRegion != null) {
      req = req.clone({
        setHeaders: {
          'x-region': ApiService.lastRegion.toString()
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
