import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPhotosSelectedByTheLecturePage } from './list-photos-selected-by-the-lecture';
import { IonicImageViewerModule } from 'ionic-img-viewer';


@NgModule({
  declarations: [
    ListPhotosSelectedByTheLecturePage
  ],
  imports: [
    IonicPageModule.forChild(ListPhotosSelectedByTheLecturePage),
    IonicImageViewerModule
  ],
})
export class ListPhotosSelectedByTheLecturePageModule {}
