/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { SignalRModelDummy } from '../models/signal-r-model-dummy';

@Injectable({
  providedIn: 'root',
})
export class SignalRService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation signalRDummy
   */
  static readonly SignalRDummyPath = '/signalr-dummy/get';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signalRDummy()` instead.
   *
   * This method doesn't expect any request body.
   */
  signalRDummy$Response(params?: {
  }): Observable<StrictHttpResponse<SignalRModelDummy>> {

    const rb = new RequestBuilder(this.rootUrl, SignalRService.SignalRDummyPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SignalRModelDummy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `signalRDummy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  signalRDummy(params?: {
  }): Observable<SignalRModelDummy> {

    return this.signalRDummy$Response(params).pipe(
      map((r: StrictHttpResponse<SignalRModelDummy>) => r.body as SignalRModelDummy)
    );
  }

}
