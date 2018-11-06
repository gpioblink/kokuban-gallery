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

interface gReturns {
    nextPageToken: string,
    mediaItems: Array<{
        baseUrl: string,
        productUrl: string
        mediaMetadata: {
            creationTime: string
        }
    }>
}

@Injectable()
export class FetchGooglePhotosServiceProvider {
  private readonly API_URL = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
  public allPhotos: Array<{
    'date': Date,
    'srcUrl': string,
    'graUrl': string,
    'refUrl': string
  }> = [];
  public selectedPhotos: Array<{
    'date': Date,
    'srcUrl': string,
    'refUrl': string
  }> = [];
  public nextPageToken: string;
  public reachLastPage: boolean = false;

  constructor(public http: HttpClient, public gapiService: GoogleApiService, public gAuth: GoogleAuthServiceProvider, private httpClient: HttpClient) {
    console.log('Hello FetchGooglePhotosServiceProvider Provider');
    this.gapiService.onLoad().subscribe();
    this.gAuth.signIn();
    // TODO: まだ認証していない時は認証ページに誘導する
    this.getAllPhotos();
  }

  //全ての画像を取得
  public getAllPhotos():void{
    this.httpClient.post<gReturns>(this.API_URL , {
      "filters": {
        "mediaTypeFilter": {
          "mediaTypes": ["PHOTO"]
        }
      },
      "pageToken": this.nextPageToken
    },{
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.gAuth.getToken()}`
      })
    }).subscribe(data => {
      console.log(data);
      // TODO: 一度読み込んだらストレージにキャッシュして高速化
      if (this.reachLastPage == false && data.nextPageToken && data.mediaItems) {
        this.nextPageToken = data.nextPageToken;
        //console.log("go to token : " + data.nextPageToken);
        for(let i=0; i<data.mediaItems.length; i++){
          this.allPhotos.push({
            date: new Date(data.mediaItems[i].mediaMetadata.creationTime),
            srcUrl: data.mediaItems[i].baseUrl,
            refUrl: data.mediaItems[i].productUrl,
            graUrl: data.mediaItems[i].baseUrl
          });
        }
        this.getAllPhotos();
      } else {
        console.log("no page left");
        this.reachLastPage = true;
      }
    });
  }

  public selectPhotos(selectDates){
    this.selectedPhotos = this.allPhotos.filter(elem => {
      // TODO: ２分木かなんかで高速化
      for(let i=0; i<selectDates.length; i++){
        if(i<5)console.log(selectDates[i].start.toLocaleString()+" "+elem.date.toLocaleString()+" "+selectDates[i].end.toLocaleString());
        if(selectDates[i].start.getTime()<elem.date.getTime()&&elem.date.getTime()<selectDates[i].end.getTime()){
          console.log("OK!");
          return true;
        }
      }
      return false;
    });

  }

}
