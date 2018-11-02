import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import {GoogleAuthServiceProvider} from "../google-auth-service/google-auth-service";
import {Observable} from "rxjs";

/*
  Generated class for the FetchGooglePhotosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FetchGooglePhotosServiceProvider {
  private readonly API_URL = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
  public result: any;

  constructor(public http: HttpClient, public gapiService: GoogleApiService, public gAuth: GoogleAuthServiceProvider, private httpClient: HttpClient) {
    console.log('Hello FetchGooglePhotosServiceProvider Provider');
    this.gapiService.onLoad().subscribe();
    this.gAuth.signIn();
    // TODO: まだ認証していない時は認証ページに誘導する
    this.getAllPhotos();
  }

  //全ての画像を取得
  public getAllPhotos(){
    this.result = this.httpClient.post(this.API_URL , {
      "filters": {
        "mediaTypeFilter": {
          "mediaTypes": ["PHOTO"]
        }
      }
    },{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.gAuth.getToken()}`
      })
    }).subscribe(data => {
      this.result = data;
      console.log(this.result);
    });
  }

}
