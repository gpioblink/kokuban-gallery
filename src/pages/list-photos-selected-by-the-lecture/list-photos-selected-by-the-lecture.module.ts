import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPhotosSelectedByTheLecturePage } from './list-photos-selected-by-the-lecture';

@NgModule({
  declarations: [
    ListPhotosSelectedByTheLecturePage,
  ],
  imports: [
    IonicPageModule.forChild(ListPhotosSelectedByTheLecturePage),
  ],
})
export class ListPhotosSelectedByTheLecturePageModule {}
