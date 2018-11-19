import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import GoogleUser = gapi.auth2.GoogleUser;
import {GoogleAuthService} from "ng-gapi";
import {NavController} from "ionic-angular";

/*
  Generated class for the GoogleAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoogleAuthServiceProvider {

  //Duplicate of GoogleAuthService
  private pendingSignin : boolean;
  private user: GoogleUser;
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  constructor(public http: HttpClient, private googleAuth: GoogleAuthService) {
    console.log('Hello GoogleAuthServiceProvider Provider');
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem(GoogleAuthServiceProvider.SESSION_STORAGE_KEY);
    if (!token) {
      if(!this.pendingSignin) throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(GoogleAuthServiceProvider.SESSION_STORAGE_KEY);
  }

  public signIn(navCntl :NavController) {
    this.googleAuth.getAuth()
      .subscribe((auth) => {
        auth.signIn().then(res => this.signInSuccessHandler(res,navCntl), (err,navCntl) => this.signInErrorHandler(err,navCntl));
      });
  }

  private signInSuccessHandler(res: GoogleUser, navCntl: NavController) {
    this.user = res;
    console.log("Sign In OK!!");
    sessionStorage.setItem(
      GoogleAuthServiceProvider.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
    console.log("Token finede!!!");
    if(typeof navCntl !== "undefined") navCntl.popToRoot();
    console.log(this.getToken());
    
  }

  private signInErrorHandler(res: GoogleUser, navCntl: NavController) {
    console.log("Sign In NG!! Opening Login Dialog...");
    if(typeof navCntl !== "undefined") navCntl.push('LoginPage');
    this.pendingSignin = true;
    console.log(this.getToken());
  }

}
