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


@Injectable({
  providedIn: 'root',
})
export class WebConnectService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation webConnectToken
   */
  static readonly WebConnectTokenPath = '/gateway/token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `webConnectToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  webConnectToken$Response(params?: {
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, WebConnectService.WebConnectTokenPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `webConnectToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  webConnectToken(params?: {
  }): Observable<string> {

    return this.webConnectToken$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation webConnectTokenImage
   */
  static readonly WebConnectTokenImagePath = '/qr/image/{token}.png';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `webConnectTokenImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  webConnectTokenImage$Response(params: {
    token: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, WebConnectService.WebConnectTokenImagePath, 'get');
    if (params) {
      rb.path('token', params.token, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: 'application/octet-stream'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Blob>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `webConnectTokenImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  webConnectTokenImage(params: {
    token: string;
  }): Observable<Blob> {

    return this.webConnectTokenImage$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
