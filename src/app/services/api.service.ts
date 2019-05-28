import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Config } from 'src/config/config';

@Injectable()
export class ApiService {

  constructor(private httpClient: HttpClient, private config: Config) { }

  public sendStats(obj: any) {
    return this.httpClient.post(environment.apiUrl + '/stats?token=' + this.config.signalRToken, obj, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  public token() {
    return this.httpClient.get(environment.apiUrl + '/qr/token', { responseType: 'text' });
  }
}
