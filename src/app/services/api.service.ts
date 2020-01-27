import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'src/config/config';
import { Region } from '../interfaces/region';
import { Changelog } from '../interfaces/changelog';
import { HistoryListRequest } from '../interfaces/history-list-request';

@Injectable()
export class ApiService {

  mode = 'PVP';
  lastInfo: string;
  lastRegion: Region;

  constructor(private httpClient: HttpClient, private config: Config) { }

  resendState() {
    this.sendStats(this.lastInfo, this.lastRegion).subscribe();
  }

  sendStats(tempArenaInfoJson: string, region: Region) {
    this.lastInfo = tempArenaInfoJson;
    this.lastRegion = region;
    var temp = JSON.parse(tempArenaInfoJson);
    temp['matchGroup'] = this.mode;
    tempArenaInfoJson = JSON.stringify(temp);
    return this.httpClient.post(environment.apiUrl + '/stats?token=' + this.config.signalRToken, tempArenaInfoJson, {
      headers: {
        'content-type': 'application/json',
        'x-region': region.toString()
      }
    });
  }

  changelogLatest() {
    return this.httpClient.get<Changelog>((environment.apiUrl + '/changelog/latest'), { observe: 'body' });
  }

  changelogIds() {
    return this.httpClient.get<number[]>((environment.apiUrl + '/changelog/ids'), { observe: 'body' });
  }

  changelogList() {
    return this.httpClient.get<Changelog[]>((environment.apiUrl + '/changelog/list'), { observe: 'body' });
  }

  changelogDetail(id: number) {
    return this.httpClient.post<Changelog>((environment.apiUrl + '/changelog/detail?id=' + id.toString()), { observe: 'body' });
  }

  token() {
    return this.httpClient.get(environment.apiUrl + '/qr/token', { responseType: 'text' });
  }

  clansAutocomplete(query: string) {
    return this.httpClient.post<any[]>(environment.apiUrl + '/clans/autocomplete?query=' + query, null, { observe: 'body' });
  }

  clansResolveIds(arr: number[]) {
    return this.httpClient.post<any[]>(environment.apiUrl + '/clans/resolveids?ids=' + arr.join(','), null, { observe: 'body' });
  }

  clansSeasons() {
    return this.httpClient.get<any[]>(environment.apiUrl + '/clans/seasons', { observe: 'body' });
  }

  clansHistory(request: HistoryListRequest) {
    return this.httpClient.post<any>(environment.apiUrl + '/clans/history', request, { observe: 'body' });
  }
}
