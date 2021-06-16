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
export class DownloadsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation downloadsLatest
   */
  static readonly DownloadsLatestPath = '/downloads/latest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadsLatest()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadsLatest$Response(params?: {
    channel?: string;
    platform?: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, DownloadsService.DownloadsLatestPath, 'get');
    if (params) {
      rb.query('channel', params.channel, {});
      rb.query('platform', params.platform, {});
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
   * To access the full response (for headers, for example), `downloadsLatest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadsLatest(params?: {
    channel?: string;
    platform?: string;
  }): Observable<Blob> {

    return this.downloadsLatest$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

  /**
   * Path part for operation downloadsPortable
   */
  static readonly DownloadsPortablePath = '/downloads/portable';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadsPortable()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadsPortable$Response(params?: {
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, DownloadsService.DownloadsPortablePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `downloadsPortable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadsPortable(params?: {
  }): Observable<Blob> {

    return this.downloadsPortable$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
