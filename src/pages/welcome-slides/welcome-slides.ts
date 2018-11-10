import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, Platform} from 'ionic-angular';
import {Slide} from "./welcome-slides.module";

/**
 * Generated class for the WelcomeSlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage( {name: "WelcomeSlidesPage", segment: 'welcome', defaultHistory: ['Home'] })
@Component({
  selector: 'page-welcome-slides',
  templateUrl: 'welcome-slides.html',
})
export class WelcomeSlidesPage {
  slides: Slide[] =[
    {
      title: "黒板ギャラリーへようこそ",
      description: "授業リストから科目を選択するだけで、スマホで撮影した写真を授業別に整理して表示します",
      image: 'https://1.bp.blogspot.com/-FoUrPjaUSRY/Us_L_nhHZ1I/AAAAAAAAc_Q/WJYPClruxuM/s800/daigaku_toudai.png',
    },
    {
      title: "初期設定について",
      description: "このサイトの使用には、次の２つの情報が必要です",
      image: 'https://1.bp.blogspot.com/-jefJLBUcRlw/W4PJ5-LSIkI/AAAAAAABOK4/QPJplUO1R4s6h8kPL3VWDyD7VcLy6yUlwCLcBGAs/s800/pasokon_kyoushitsu_smartphone.png',
    },
    {
      title: "Googleアカウント",
      description: "スマホなどの授業写真を撮影し、Googleフォトに同期しているアカウントを用意してください",
      image: 'https://4.bp.blogspot.com/-0Rz1rpJmOXw/V8jqYWtsdOI/AAAAAAAA9eE/48HyKYDJNLoIkfCMa8c_CC6LG45AdC3hgCLcB/s400/computer_cloud_storage.png',
    },
    {
      title: "ヅ大のiCal形式カレンダー",
      description: "学務システムの「カレンダー連携」から取得した授業予定のURLを用意してください",
      image: 'https://1.bp.blogspot.com/-RJRt_Hv37Kk/VMIu-CCBpII/AAAAAAAAq2E/JsIJ8pPwmuY/s800/calender_takujou.png',
    },
  ];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, public platform: Platform) {
    this.dir = platform.dir();
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
