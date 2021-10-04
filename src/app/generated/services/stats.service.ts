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

import { Arenainfo } from '../models/arenainfo';
import { MatchAppModel } from '../models/match-app-model';

@Injectable({
  providedIn: 'root',
})
export class StatsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation statsSendStats
   */
  static readonly StatsSendStatsPath = '/stats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statsSendStats()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  statsSendStats$Response(params: {
    body: Arenainfo
  }): Observable<StrictHttpResponse<MatchAppModel>> {

    const rb = new RequestBuilder(this.rootUrl, StatsService.StatsSendStatsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MatchAppModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `statsSendStats$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  statsSendStats(params: {
    body: Arenainfo
  }): Observable<MatchAppModel> {

    return this.statsSendStats$Response(params).pipe(
      map((r: StrictHttpResponse<MatchAppModel>) => r.body as MatchAppModel)
    );
  }

  /**
   * Path part for operation statsRefreshStats
   */
  static readonly StatsRefreshStatsPath = '/refreshStats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statsRefreshStats()` instead.
   *
   * This method doesn't expect any request body.
   */
  statsRefreshStats$Response(params?: {
    matchId?: number;
    token?: string;
    accountName?: string;
  }): Observable<StrictHttpResponse<Blob>> {

    const rb = new RequestBuilder(this.rootUrl, StatsService.StatsRefreshStatsPath, 'post');
    if (params) {
      rb.query('matchId', params.matchId, {});
      rb.query('token', params.token, {});
      rb.query('accountName', params.accountName, {});
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
   * To access the full response (for headers, for example), `statsRefreshStats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statsRefreshStats(params?: {
    matchId?: number;
    token?: string;
    accountName?: string;
  }): Observable<Blob> {

    return this.statsRefreshStats$Response(params).pipe(
      map((r: StrictHttpResponse<Blob>) => r.body as Blob)
    );
  }

}
