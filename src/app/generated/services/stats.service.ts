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

}
