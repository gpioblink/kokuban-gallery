import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FetchGooglePhotosServiceProvider} from "../../providers/fetch-google-photos-service/fetch-google-photos-service";

@IonicPage( {name: "ListPhotosSelectedByTheLecturePage", segment: 'show/:name', defaultHistory: ['Home']})
@Component({
    selector: 'page-list-photos-selected-by-the-lecture',
    templateUrl: 'list-photos-selected-by-the-lecture.html',
})

export class ListPhotosSelectedByTheLecturePage {


    photos: Array<{
        'date': Date,
        'srcUrl': string,
        'refUrl': string
    }> = [];

    title: string = "授業ビュー";
    location: string = "場所";


    constructor(public navCtrl: NavController, public navParams: NavParams,
                //private ngZone: NgZone, public httpClient: HttpClient,
                //public loadingCtl: LoadingController,
                public fetchPhotos: FetchGooglePhotosServiceProvider) {
        console.log('ionViewDidLoad ListPhotosSelectedByTheLecturePage');
    }

    ionViewDidLoad() {
        this.title = this.navParams.get("name");
        this.location = this.navParams.get("location");
        //let loading = this.loadingCtl.create({content: "お待ちください..\nこの処理には最大で3分かかります"});
        //loading.present();
        this.fetchPhotos.selectPhotos(this.navParams.get("dates"));
        this.photos = this.fetchPhotos.selectedPhotos;
    }

}