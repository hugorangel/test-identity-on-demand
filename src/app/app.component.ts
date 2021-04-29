import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './core/http/api.service';
import { ISessionObject } from './types/session.type';
import { ITokenObject } from './types/token.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'test-identity-on-demand';
  userName = '';
  secret = '';
  theToken: ITokenObject;
  sessionId = '';
  theSessionObject: ISessionObject;


  constructor(private apiService: ApiService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params['sessionId']);
      this.sessionId = params['sessionId'];
    });
  }

  createIdentificationSession(): void {

    this.apiService.getBearerToken(this.userName, this.secret).subscribe((data) => {
      this.theToken = data;
    }, (err) => {
      console.log(err)
    });
  }

  getIdAndRedirectUrl(): void {
    this.apiService.getSessionInfo(this.theToken.access_token).subscribe((data) => {
      window.location.href = data.url;
    });
  }

  getUserInfo(): void {
    this.apiService.getUserInfo(this.theToken.access_token, this.sessionId).subscribe((data) => {
      this.theSessionObject = data;
    });
  }
}
