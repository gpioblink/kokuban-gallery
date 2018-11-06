import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FetchCalendarServiceProvider } from '../providers/fetch-calendar-service/fetch-calendar-service';
import {HttpClientModule} from "@angular/common/http";
import { FetchGooglePhotosServiceProvider } from '../providers/fetch-google-photos-service/fetch-google-photos-service';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";
import { GoogleAuthServiceProvider } from '../providers/google-auth-service/google-auth-service';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "250849318613-dabn85udvsa1htc3c5geigmndccmdluq.apps.googleusercontent.com",
  discoveryDocs: ["https://photoslibrary.googleapis.com/$discovery/rest?version=v1"],
  scope: [
    "https://www.googleapis.com/auth/photoslibrary.readonly"
  ].join(" ")
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: FetchCalendarServiceProvider, useClass: FetchCalendarServiceProvider},
    {provide: FetchGooglePhotosServiceProvider, useClass: FetchGooglePhotosServiceProvider},
    GoogleAuthServiceProvider
  ]
})
export class AppModule {}
