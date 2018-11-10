import { NgModule } from '@angular/core';
import {IonicPage, IonicPageModule, MenuController, NavController, Platform} from 'ionic-angular';
import { WelcomeSlidesPage } from './welcome-slides';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@NgModule({
  declarations: [
    WelcomeSlidesPage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeSlidesPage),
  ],
})
export class WelcomeSlidesPageModule{}
