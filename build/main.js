webpackJsonp([4],{

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchGooglePhotosServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_gapi__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__google_auth_service_google_auth_service__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FetchGooglePhotosServiceProvider = /** @class */ (function () {
    function FetchGooglePhotosServiceProvider(http, gapiService, gAuth, httpClient) {
        this.http = http;
        this.gapiService = gapiService;
        this.gAuth = gAuth;
        this.httpClient = httpClient;
        this.API_URL = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
        this.allPhotos = [];
        this.selectedPhotos = [];
        this.reachLastPage = false;
        console.log('Hello FetchGooglePhotosServiceProvider Provider');
        this.gapiService.onLoad().subscribe();
    }
    FetchGooglePhotosServiceProvider.prototype.photoGetter = function (navCntl) {
        this.navCntl = navCntl;
        try {
            this.gAuth.signIn(this.navCntl);
        }
        catch (_a) {
            // まだ認証していない時は認証ページに誘導する
            if (typeof this.navCntl !== "undefined")
                this.navCntl.push('LoginPage');
        }
        this.getAllPhotos();
    };
    //全ての画像を取得
    FetchGooglePhotosServiceProvider.prototype.getAllPhotos = function () {
        var _this = this;
        var tdata;
        try {
            tdata = this.gAuth.getToken();
        }
        catch (_a) {
            // まだ認証していない時は認証ページに誘導する
            console.log(typeof this.navCntl);
            if (typeof this.navCntl !== "undefined")
                this.navCntl.push('LoginPage');
        }
        this.httpClient.post(this.API_URL, {
            "filters": {
                "mediaTypeFilter": {
                    "mediaTypes": ["PHOTO"]
                }
            },
            "pageToken": this.nextPageToken
        }, {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                Authorization: "Bearer " + tdata
            })
        }).subscribe(function (data) {
            console.log(data);
            // TODO: 一度読み込んだらストレージにキャッシュして高速化
            if (_this.reachLastPage == false && data.nextPageToken && data.mediaItems) {
                _this.nextPageToken = data.nextPageToken;
                //console.log("go to token : " + data.nextPageToken);
                for (var i = 0; i < data.mediaItems.length; i++) {
                    _this.allPhotos.push({
                        date: new Date(data.mediaItems[i].mediaMetadata.creationTime),
                        srcUrl: data.mediaItems[i].baseUrl,
                        refUrl: data.mediaItems[i].productUrl,
                        graUrl: data.mediaItems[i].baseUrl
                    });
                }
                _this.getAllPhotos();
            }
            else {
                console.log("no page left");
                _this.reachLastPage = true;
            }
        });
    };
    FetchGooglePhotosServiceProvider.prototype.selectPhotos = function (selectDates) {
        this.selectedPhotos = this.allPhotos.filter(function (elem) {
            // TODO: ２分木かなんかで高速化
            for (var i = 0; i < selectDates.length; i++) {
                if (i < 5)
                    console.log(selectDates[i].start.toLocaleString() + " " + elem.date.toLocaleString() + " " + selectDates[i].end.toLocaleString());
                if (selectDates[i].start.getTime() < elem.date.getTime() && elem.date.getTime() < selectDates[i].end.getTime()) {
                    console.log("OK!");
                    return true;
                }
            }
            return false;
        });
    };
    FetchGooglePhotosServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ng_gapi__["b" /* GoogleApiService */], __WEBPACK_IMPORTED_MODULE_3__google_auth_service_google_auth_service__["a" /* GoogleAuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], FetchGooglePhotosServiceProvider);
    return FetchGooglePhotosServiceProvider;
}());

//# sourceMappingURL=fetch-google-photos-service.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleAuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_gapi__ = __webpack_require__(129);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the GoogleAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GoogleAuthServiceProvider = /** @class */ (function () {
    function GoogleAuthServiceProvider(http, googleAuth) {
        this.http = http;
        this.googleAuth = googleAuth;
        console.log('Hello GoogleAuthServiceProvider Provider');
    }
    GoogleAuthServiceProvider_1 = GoogleAuthServiceProvider;
    GoogleAuthServiceProvider.prototype.getToken = function () {
        var token = sessionStorage.getItem(GoogleAuthServiceProvider_1.SESSION_STORAGE_KEY);
        if (!token) {
            if (!this.pendingSignin)
                throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(GoogleAuthServiceProvider_1.SESSION_STORAGE_KEY);
    };
    GoogleAuthServiceProvider.prototype.signIn = function (navCntl) {
        var _this = this;
        this.googleAuth.getAuth()
            .subscribe(function (auth) {
            auth.signIn().then(function (res) { return _this.signInSuccessHandler(res, navCntl); }, function (err, navCntl) { return _this.signInErrorHandler(err, navCntl); });
        });
    };
    GoogleAuthServiceProvider.prototype.signInSuccessHandler = function (res, navCntl) {
        this.user = res;
        console.log("Sign In OK!!");
        sessionStorage.setItem(GoogleAuthServiceProvider_1.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
        console.log("Token finede!!!");
        if (typeof navCntl !== "undefined")
            navCntl.popToRoot();
        console.log(this.getToken());
    };
    GoogleAuthServiceProvider.prototype.signInErrorHandler = function (res, navCntl) {
        console.log("Sign In NG!! Opening Login Dialog...");
        if (typeof navCntl !== "undefined")
            navCntl.push('LoginPage');
        this.pendingSignin = true;
        console.log(this.getToken());
    };
    GoogleAuthServiceProvider.SESSION_STORAGE_KEY = 'accessToken';
    GoogleAuthServiceProvider = GoogleAuthServiceProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2_ng_gapi__["c" /* GoogleAuthService */]])
    ], GoogleAuthServiceProvider);
    return GoogleAuthServiceProvider;
    var GoogleAuthServiceProvider_1;
}());

//# sourceMappingURL=google-auth-service.js.map

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/list-photos-selected-by-the-lecture/list-photos-selected-by-the-lecture.module": [
		489,
		3
	],
	"../pages/login/login.module": [
		490,
		2
	],
	"../pages/settings/settings.module": [
		491,
		1
	],
	"../pages/welcome-slides/welcome-slides.module": [
		492,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 237;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_fetch_calendar_service_fetch_calendar_service__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_fetch_google_photos_service_fetch_google_photos_service__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, fetchCal, fetchPhotos) {
        this.navCtrl = navCtrl;
        this.fetchCal = fetchCal;
        this.fetchPhotos = fetchPhotos;
        //初期起動の場合はwelcome-slidesを表示する
        fetchPhotos.photoGetter(this.navCtrl);
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>黒板ギャラリー</ion-title>\n    <ion-buttons end>\n      <button [navPush]="\'SettingsPage\'" ion-button icon-only>\n        <ion-icon name="settings"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content padding>\n  <!--<pre>{{fetchCal.lectureList|json}}</pre>\n  <pre>{{fetchPhotos.allPhotos|json}}</pre>-->\n  <!--TODO: 初期画面として以下のコンテンツを実装する-->\n  <!--<h3>黒板ギャラリーへようこそ</h3>\n\n  <p>\n    Google Photosの写真を講義別に整理して表示します！\n  </p>\n  <p>\n    まずは、メニューの設定から、あなたの講義情報を登録してください！\n  </p>\n  <p>\n    <button ion-button color="primary" menuToggle>メニューを開く</button>\n  </p>\n  -->\n  <ion-list>\n    <ion-item *ngFor="let lec of fetchCal.lectureList" [navPush]="\'ListPhotosSelectedByTheLecturePage\'" [navParams]="{\'name\': lec.name, \'location\': lec.location,\n    \'dates\': lec.dates}">\n      {{lec.name}}\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_fetch_calendar_service_fetch_calendar_service__["a" /* FetchCalendarServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_fetch_google_photos_service_fetch_google_photos_service__["a" /* FetchGooglePhotosServiceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchCalendarServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the FetchCalendarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FetchCalendarServiceProvider = /** @class */ (function () {
    function FetchCalendarServiceProvider(http) {
        var _this = this;
        this.http = http;
        this.lectureList = [];
        console.log('Hello FetchCalendarServiceProvider Provider');
        //会津大学のサイトから授業情報を持ってくる
        // TODO:　自分のiCal形式のカレンダーを自由に登録できるようにする　
        var calUrl = sessionStorage.getItem('calUrl');
        if (typeof calUrl !== "string" || !(calUrl.startsWith("http://") && calUrl.startsWith("https://"))) {
            sessionStorage.setItem('calUrl', "https://powerful-wave-23015.herokuapp.com/https://csweb.u-aizu.ac.jp/calendar/882f86382b909d70cb21825f2e737c69fe7370e6-J.ics");
        }
        calUrl = sessionStorage.getItem('calUrl');
        http.get(calUrl, { responseType: 'text' })
            .subscribe(function (data) {
            _this.caldata = FetchCalendarServiceProvider_1.convert(data)["VCALENDAR"][0]["VEVENT"];
            //nameをキーとして重複無しで取り出す
            /*let lectures = this.caldata.filter((v1,i1,a1) => {
              return (a1.findIndex(v2 => {
                return (v1.SUMMARY===v2.SUMMARY)
              }) === i1);
            });*/
            _this.caldata.sort(function (a, b) {
                if (a['SUMMARY'] < b['SUMMARY'])
                    return -1;
                if (a['SUMMARY'] > b['SUMMARY'])
                    return 1;
                return 0;
            });
            console.log(_this.lectureList);
            //{name, datetime[]} という感じのリストを作る
            for (var i = 0; i < _this.caldata.length;) {
                //console.log(this.caldata[i]);
                _this.lectureList[_this.lectureList.length] = {
                    'name': _this.caldata[i]["SUMMARY"],
                    'location': _this.caldata[i]["LOCATION"],
                    'dates': []
                };
                var j = 0;
                while (i < _this.caldata.length && (j == 0 || _this.caldata[i - 1]["SUMMARY"] == _this.caldata[i]["SUMMARY"])) {
                    //console.log(i+" "+j+":"+this.caldata[i]["SUMMARY"]);
                    _this.lectureList[_this.lectureList.length - 1]['dates'][j] = {
                        'start': FetchCalendarServiceProvider_1.dateFormat(_this.caldata[i]["DTSTART;TZID=Asia/Tokyo"]),
                        'end': FetchCalendarServiceProvider_1.dateFormat(_this.caldata[i]["DTEND;TZID=Asia/Tokyo"])
                    };
                    i++;
                    j++;
                }
                if (i < _this.caldata.length)
                    console.log("Break" + i + " " + j + ":" + _this.caldata[i]["SUMMARY"]);
            }
            for (var i = 0; i < _this.lectureList.length; i++) {
                _this.lectureList[i].dates.sort(function (a, b) {
                    if (a.start.getTime() < b.start.getTime())
                        return -1;
                    if (a.start.getTime() > b.start.getTime())
                        return 1;
                    return 0;
                });
            }
            console.log(_this.lectureList);
        });
    }
    FetchCalendarServiceProvider_1 = FetchCalendarServiceProvider;
    FetchCalendarServiceProvider.dateFormat = function (str) {
        var arr = (str.substr(0, 4) + '/' + str.substr(4, 2) + '/' + str.substr(6, 2)
            + '/' + str.substr(9, 2) + '/' + str.substr(11, 2) + '/' + str.substr(13, 2))
            .split('/');
        return new Date(Number(arr[0]), Number(arr[1]) - 1, Number(arr[2]), Number(arr[3]), Number(arr[4]), Number(arr[5]));
    };
    /**
     * Take ical string data and convert to JSON
     *
     * @returns {Object}
     * @param source sourceUrl
     */
    FetchCalendarServiceProvider.convert = function (source) {
        var currentKey = "", currentValue = "", 
        //objectNames:string[] = [],
        output = [], parentObj = [], lines = source.split(FetchCalendarServiceProvider_1.NEW_LINE), splitAt;
        var currentObj = output;
        var parents = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.charAt(0) === " ") {
                currentObj[currentKey] += line.substr(1);
            }
            else {
                splitAt = line.indexOf(":");
                if (splitAt < 0) {
                    continue;
                }
                currentKey = line.substr(0, splitAt);
                currentValue = line.substr(splitAt + 1);
                switch (currentKey) {
                    // TODO: もっと一般化されたフォーマットでも使えるようにする
                    case "BEGIN":
                        parents.push(parentObj);
                        parentObj = currentObj;
                        if (parentObj[currentValue] == null) {
                            parentObj[currentValue] = [];
                        }
                        // Create a new object, store the reference for future uses
                        currentObj = {};
                        parentObj[currentValue].push(currentObj);
                        break;
                    case "END":
                        currentObj = parentObj;
                        parentObj = parents.pop();
                        break;
                    case "LOCATION":
                    case "LAST-MODIFIED":
                    case "DTSTART;TZID=Asia/Tokyo":
                    case "DTEND;TZID=Asia/Tokyo":
                    case "DTSTAMP":
                    case "UID":
                    case "SUMMARY":
                        //default:
                        if (currentObj[currentKey]) {
                            if (!Array.isArray(currentObj[currentKey])) {
                                currentObj[currentKey] = [currentObj[currentKey]];
                            }
                            currentObj[currentKey].push(currentValue);
                        }
                        else {
                            currentObj[currentKey] = currentValue;
                        }
                }
            }
        }
        return output;
    };
    ;
    /**
     * Take JSON, revert back to ical
     * @param {Object} object
     * @return {String}
     */
    FetchCalendarServiceProvider.revert = function (object) {
        var lines = [];
        var _loop_1 = function (key) {
            var value = object[key];
            if (Array.isArray(value)) {
                value.forEach(function (item) {
                    lines.push("BEGIN:" + key);
                    lines.push(FetchCalendarServiceProvider_1.revert(item));
                    lines.push("END:" + key);
                });
            }
            else {
                var fullLine = key + ":" + value;
                do {
                    // According to ical spec, lines of text should be no longer
                    // than 75 octets
                    lines.push(fullLine.substr(0, 75));
                    fullLine = ' ' + fullLine.substr(75);
                } while (fullLine.length > 1);
            }
        };
        for (var key in object) {
            _loop_1(key);
        }
        return lines.join('\n');
    };
    ;
    //Ical2Jsonの移植スクリプト
    FetchCalendarServiceProvider.NEW_LINE = /\r\n|\n|\r/;
    FetchCalendarServiceProvider = FetchCalendarServiceProvider_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], FetchCalendarServiceProvider);
    return FetchCalendarServiceProvider;
    var FetchCalendarServiceProvider_1;
}());

//# sourceMappingURL=fetch-calendar-service.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(421);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_fetch_calendar_service_fetch_calendar_service__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_fetch_google_photos_service_fetch_google_photos_service__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng_gapi__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_google_auth_service_google_auth_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ionic_img_viewer__ = __webpack_require__(288);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var gapiClientConfig = {
    client_id: "250849318613-dabn85udvsa1htc3c5geigmndccmdluq.apps.googleusercontent.com",
    discoveryDocs: ["https://photoslibrary.googleapis.com/$discovery/rest?version=v1"],
    scope: [
        "https://www.googleapis.com/auth/photoslibrary.readonly"
    ].join(" ")
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/list-photos-selected-by-the-lecture/list-photos-selected-by-the-lecture.module#ListPhotosSelectedByTheLecturePageModule', name: 'ListPhotosSelectedByTheLecturePage', segment: 'show/:name', priority: 'low', defaultHistory: ['Home'] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome-slides/welcome-slides.module#WelcomeSlidesPageModule', name: 'WelcomeSlidesPage', segment: 'welcome', priority: 'low', defaultHistory: ['Home'] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10_ng_gapi__["a" /* GoogleApiModule */].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_10_ng_gapi__["d" /* NG_GAPI_CONFIG */],
                    useValue: gapiClientConfig
                }),
                __WEBPACK_IMPORTED_MODULE_12_ionic_img_viewer__["a" /* IonicImageViewerModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_7__providers_fetch_calendar_service_fetch_calendar_service__["a" /* FetchCalendarServiceProvider */], useClass: __WEBPACK_IMPORTED_MODULE_7__providers_fetch_calendar_service_fetch_calendar_service__["a" /* FetchCalendarServiceProvider */] },
                { provide: __WEBPACK_IMPORTED_MODULE_9__providers_fetch_google_photos_service_fetch_google_photos_service__["a" /* FetchGooglePhotosServiceProvider */], useClass: __WEBPACK_IMPORTED_MODULE_9__providers_fetch_google_photos_service_fetch_google_photos_service__["a" /* FetchGooglePhotosServiceProvider */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_google_auth_service_google_auth_service__["a" /* GoogleAuthServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/gpioblink/learnwebdev/hackschool/kokuban-gallery/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[289]);
//# sourceMappingURL=main.js.map