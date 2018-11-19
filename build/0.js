webpackJsonp([0],{

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeSlidesPageModule", function() { return WelcomeSlidesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__welcome_slides__ = __webpack_require__(496);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var WelcomeSlidesPageModule = /** @class */ (function () {
    function WelcomeSlidesPageModule() {
    }
    WelcomeSlidesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__welcome_slides__["a" /* WelcomeSlidesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__welcome_slides__["a" /* WelcomeSlidesPage */]),
            ],
        })
    ], WelcomeSlidesPageModule);
    return WelcomeSlidesPageModule;
}());

//# sourceMappingURL=welcome-slides.module.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeSlidesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the WelcomeSlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomeSlidesPage = /** @class */ (function () {
    function WelcomeSlidesPage(navCtrl, menu, platform) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.platform = platform;
        this.slides = [
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
        this.showSkip = true;
        this.dir = 'ltr';
        this.dir = platform.dir();
    }
    WelcomeSlidesPage.prototype.startApp = function () {
        // this.navCtrl.setRoot('HomePage', {}, {
        //   animate: true,
        //   direction: 'forward'
        // });
        this.navCtrl.pop();
    };
    WelcomeSlidesPage.prototype.onSlideChangeStart = function (slider) {
        this.showSkip = !slider.isEnd();
    };
    WelcomeSlidesPage.prototype.ionViewDidEnter = function () {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    };
    WelcomeSlidesPage.prototype.ionViewWillLeave = function () {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    };
    WelcomeSlidesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome-slides',template:/*ion-inline-start:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/pages/welcome-slides/welcome-slides.html"*/'<ion-content pager>\n\n  <ion-slides no-padding pager>\n    <ion-slide *ngFor="let slide of slides">\n      <ion-toolbar>\n        <ion-buttons end>\n          <button ion-button color="primary" (click)="startApp()">Skip</button>\n        </ion-buttons>\n      </ion-toolbar>\n      <img [src]="slide.image" class="slide-image"/>\n      <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n      <p [innerHTML]="slide.description"></p>\n    </ion-slide>\n    <ion-slide>\n      <ion-toolbar>\n      </ion-toolbar>\n      <img src="https://3.bp.blogspot.com/-d-VAkROJjoA/U1T3q_91XUI/AAAAAAAAfVA/juMk8sE2UAI/s800/figure_maintenance.png" class="slide-image"/>\n      <h2 class="slide-title">設定の準備はできましたか？</h2>\n      <button ion-button large clear icon-end color="primary" (click)="startApp()">\n        設定画面へ\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/pages/welcome-slides/welcome-slides.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */]])
    ], WelcomeSlidesPage);
    return WelcomeSlidesPage;
}());

//# sourceMappingURL=welcome-slides.js.map

/***/ })

});
//# sourceMappingURL=0.js.map