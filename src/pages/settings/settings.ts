import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  todo = {
    title: sessionStorage.getItem('calUrl'),
    description: ''
  };

  logForm(form) {
    console.log(form.value);
    sessionStorage.setItem('calUrl', this.todo.title);
    this.navCtrl.pop();
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }


  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
