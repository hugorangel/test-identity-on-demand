import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _theUrl = 'https://localhost:5001/';

  constructor(private http: HttpClient) { }

  setupIdentificationSession(): void {

  }

  getBearerToken(userName: string, secret: string): Observable<any> {
    return this.http.get(`${this._theUrl}api/v1/authentication/token`);
  }

  getSessionInfo(token: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8')
    .set('Authorization', `Bearer ${token}`);

    const theDefaultBody =
      {
        flow: 'redirect',
        allowedProviders: [
          'no_bankid_netcentric',
          'no_bankid_mobile'
        ],
        include: [
          'name',
          'date_of_birth'
        ],
        redirectSettings: {
          successUrl: 'http://localhost:4200',
          abortUrl: 'https://example.com/abort',
          errorUrl: 'https://example.com/error'
        }
      }


    return this.http.post(`${this._theUrl}api/v1/authentication/session`, theDefaultBody, {headers})
  }

  getUserInfo(token: string, sessionId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this._theUrl}api/v1/authentication/session/${sessionId}`, {headers});
  }
}
