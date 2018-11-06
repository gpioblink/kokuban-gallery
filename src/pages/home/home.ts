import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FetchCalendarServiceProvider} from "../../providers/fetch-calendar-service/fetch-calendar-service";
import {FetchGooglePhotosServiceProvider} from "../../providers/fetch-google-photos-service/fetch-google-photos-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private fetchCal: FetchCalendarServiceProvider,
              public fetchPhotos: FetchGooglePhotosServiceProvider
  ) {
    console.log(fetchCal.aaaaa);
  }
}
