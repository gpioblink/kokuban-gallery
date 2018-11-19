import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoogleAuthServiceProvider} from "../../providers/google-auth-service/google-auth-service";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public gAuth: GoogleAuthServiceProvider) {
    let calUrl:string = sessionStorage.getItem('calUrl');
    if(typeof calUrl !== "string" ||!(calUrl.startsWith("http://")&&calUrl.startsWith("https://"))) this.navCtrl.push('WelcomeSlidesPage');
  }

  login() {
    this.gAuth.signIn(this.navCtrl);
  }
}
