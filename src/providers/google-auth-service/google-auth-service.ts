import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import {GoogleAuthService} from "ng-gapi";

/*
  Generated class for the GoogleAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleAuthServiceProvider {

  //Duplicate of GoogleAuthService

  private user: GoogleUser;
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  constructor(public http: HttpClient, private googleAuth: GoogleAuthService) {
    console.log('Hello GoogleAuthServiceProvider Provider');
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem(GoogleAuthServiceProvider.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(GoogleAuthServiceProvider.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res));
      });
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    console.log("Sign In OK!!");
    sessionStorage.setItem(
      GoogleAuthServiceProvider.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
    console.log(this.getToken());
  }

}
