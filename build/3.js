webpackJsonp([3],{

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPhotosSelectedByTheLecturePageModule", function() { return ListPhotosSelectedByTheLecturePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_photos_selected_by_the_lecture__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ListPhotosSelectedByTheLecturePageModule = /** @class */ (function () {
    function ListPhotosSelectedByTheLecturePageModule() {
    }
    ListPhotosSelectedByTheLecturePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__list_photos_selected_by_the_lecture__["a" /* ListPhotosSelectedByTheLecturePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__list_photos_selected_by_the_lecture__["a" /* ListPhotosSelectedByTheLecturePage */]),
                __WEBPACK_IMPORTED_MODULE_3_ionic_img_viewer__["a" /* IonicImageViewerModule */]
            ],
        })
    ], ListPhotosSelectedByTheLecturePageModule);
    return ListPhotosSelectedByTheLecturePageModule;
}());

//# sourceMappingURL=list-photos-selected-by-the-lecture.module.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPhotosSelectedByTheLecturePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_fetch_google_photos_service_fetch_google_photos_service__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListPhotosSelectedByTheLecturePage = /** @class */ (function () {
    function ListPhotosSelectedByTheLecturePage(navCtrl, navParams, 
        //private ngZone: NgZone, public httpClient: HttpClient,
        //public loadingCtl: LoadingController,
        fetchPhotos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fetchPhotos = fetchPhotos;
        this.photos = [];
        this.title = "授業ビュー";
        this.location = "場所";
        console.log('ionViewDidLoad ListPhotosSelectedByTheLecturePage');
    }
    ListPhotosSelectedByTheLecturePage.prototype.ionViewDidLoad = function () {
        this.title = this.navParams.get("name");
        this.location = this.navParams.get("location");
        //let loading = this.loadingCtl.create({content: "お待ちください..\nこの処理には最大で3分かかります"});
        //loading.present();
        this.fetchPhotos.selectPhotos(this.navParams.get("dates"));
        this.photos = this.fetchPhotos.selectedPhotos;
    };
    ListPhotosSelectedByTheLecturePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-photos-selected-by-the-lecture',template:/*ion-inline-start:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/pages/list-photos-selected-by-the-lecture/list-photos-selected-by-the-lecture.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}} ({{location}})</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <!--<pre>{{photos|json}}</pre>-->\n\n  <div class="images">\n    <div class="one-image" *ngFor="let image of photos">\n      <img [src]="image.srcUrl" [imageViewer]="image.srcUrl + \'=w100000-h100000\'">\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/pages/list-photos-selected-by-the-lecture/list-photos-selected-by-the-lecture.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_fetch_google_photos_service_fetch_google_photos_service__["a" /* FetchGooglePhotosServiceProvider */]])
    ], ListPhotosSelectedByTheLecturePage);
    return ListPhotosSelectedByTheLecturePage;
}());

//# sourceMappingURL=list-photos-selected-by-the-lecture.js.map

/***/ })

});
//# sourceMappingURL=3.js.map